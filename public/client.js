const socket = io()
let userName;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    userName = prompt('Please enter your name: ')
} while(!userName)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

const audio=new Audio('ting.mp3');
function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()   //trimming whitespaces(lleft,right,new line)
    }
    // Append 

    if(msg.message.length!==0){  // it it is empty message we need not to send
    appendMessage(msg, 'outgoing')
    textarea.value = ''  // once the user send the message we should clear the message from text area
    scrollToBottom()     

    // Sending message to server 
    socket.emit('message', msg)
    }

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type   // incoming or outgoing
    mainDiv.classList.add(className, 'message')
    if(type=='incoming'){   // playing  a audion sound that serves as a notification
        audio.play();
    }

    let markup = `
        <h4>${msg.user}</h4> 
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {  // automaticallly scroll to bottom so rhat user can see the latest message
    messageArea.scrollTop = messageArea.scrollHeight
}