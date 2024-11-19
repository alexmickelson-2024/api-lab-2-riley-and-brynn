using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

string fileName = "messages.json";
List<Message> messages=new();
if(File.Exists(fileName))
{
    var json = File.ReadAllText(fileName);
    messages.AddRange(JsonSerializer.Deserialize<List<Message>>(json));
}

app.MapGet("/", () => "Hello World!");
app.MapGet("/messages", () => messages);
app.MapPost("/messages", (Message msg) => 
{
    messages.Add(msg);
    var json = JsonSerializer.Serialize(messages);
    File.WriteAllText(fileName, json);
});


app.Run();

public record Message(DateTime Posted, string Text);