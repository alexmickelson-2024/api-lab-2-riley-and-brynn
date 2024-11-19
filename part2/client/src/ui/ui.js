import {setMessages, getTopMessages, getMessagesByParent} from "../domain/messages.js"
import {getMessagesFromApi, sendMessageToApi} from "../svc/api.js"


export const  displayMessages =async () => {
  setMessages(await getMessagesFromApi())

  const messageContainer = document.getElementById("previousMessages")
  messageContainer.replaceChildren()

  getTopMessages().forEach((msg) => {
    const element = createMessageWithForm(msg)
    messageContainer.appendChild(element)
  })
}

const createChildrenMessages = (msg) => {
  const childrenUL = document.createElement('ul')
  const childrenMessages = getMessagesByParent(msg.id)
  childrenMessages.forEach(m => {
    const e = createMessageWithForm(m)
    childrenUL.appendChild(e)
  })
  return childrenUL
}

const createNestedReplyForm = (msg) => {
  const formElement = document.createElement('form')
  formElement.className = "m-0 p-0"
  const input = document.createElement("input")
  input.className = "form-control w-50 ms-5 mb-1"
  input.id = `reply${msg.id}`
  
  formElement.append(input)

  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value
    await sendMessageToApi(text, msg.id)
    input.value = ""
    displayMessages();
  })
  return formElement
}
const createMessageWithForm = (msg) => {

  const li = document.createElement("li")
  li.textContent = msg.text
  
  const formElement = createNestedReplyForm(msg)

  const details = document.createElement("details")
  details.innerHTML = '  <summary class="text-secondary">Reply To Comment</summary>  '
  details.appendChild(formElement)


  li.appendChild(details)

  const childrenUL = createChildrenMessages(msg)
  
  li.appendChild(childrenUL)
  return li
}

export default {
  displayMessages
}
