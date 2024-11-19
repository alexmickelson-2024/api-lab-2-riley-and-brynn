import { sendMessageToApi, getAllMessages } from "./service.js";

function attachFormListeners() {
  const formStuff = document.getElementById("formStuff");
  const textElementInput = document.getElementById("textElementInput");
  formStuff.addEventListener("submit", async (e) => {
    e.preventDefault();
    const textvalue = textElementInput.value.trim();
    await sendMessageToApi(textvalue);
    await renderMessages();
    console.log(textvalue);
  });
}

async function renderMessages() {
  const textElementContainer = document.getElementById("textElementContainer");
  const allMessages = await getAllMessages();
  textElementContainer.replaceChildren();
  for ( const message of allMessages) {
    const messageElement = document.createElement("div");
    console.log(message)
    messageElement.textContent = message.text;
    textElementContainer.appendChild(messageElement);
  }
}

renderMessages();

attachFormListeners();

getAllMessages();
