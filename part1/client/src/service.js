const baseURL = "http://localhost:5154/";

export async function sendMessageToApi (msg) {
    const date = new Date(); 
    const string = msg; 
    const url = baseURL + "messages"
    const message = {posted : date, text : string};

    await fetch(
        url, 
        {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            "Content-Type" : "application/json",
        }
    })
    
}

export async function getAllMessages() {
    const url = baseURL + "messages"
    const response = await fetch(url);
    const messages = await response.json();
    return messages;

}