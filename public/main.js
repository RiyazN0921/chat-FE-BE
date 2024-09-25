const socket = io()

const signupForm = document.getElementById('signupForm')
const signupUsername = document.getElementById('signupUsername')
const signupPassword = document.getElementById('signupPassword')
const signupBtn = document.getElementById('signupBtn')

const loginForm = document.getElementById('loginForm')
const loginUsername = document.getElementById('loginUsername')
const loginPassword = document.getElementById('loginPassword')
const loginBtn = document.getElementById('loginBtn')

const chatContainer = document.getElementById('chatContainer')
const chatForm = document.getElementById('chatForm')
const messageInput = document.getElementById('message')
const chatMessages = document.getElementById('chatMessages')
const logoutBtn = document.getElementById('logoutBtn')

let userId = null
let token = null
let receiverId = 'default_receiver_id'

signupBtn.addEventListener('click', async () => {
  const username = signupUsername.value
  const password = signupPassword.value
  const email = signupEmail.value

  try {
    const res = await fetch('http://localhost:9000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    })
    const data = await res.json()
    if (res.ok) {
      alert('Signup successful, please login!')
    } else {
      alert(data.message || 'Signup failed')
    }
  } catch (error) {
    console.error('Signup error:', error)
  }
})

loginBtn.addEventListener('click', async () => {
  const email = loginEmail.value
  const password = loginPassword.value

  try {
    const res = await fetch('http://localhost:9000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (res.ok) {
      token = data.token
      userId = data.userId

      document.getElementById('authContainer').style.display = 'none'
      chatContainer.style.display = 'block'
    } else {
      alert(data.message || 'Login failed')
    }
  } catch (error) {
    console.error('Login error:', error)
  }
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = messageInput.value

  if (message) {
    socket.emit('chatMessage', { senderId: userId, receiverId, message })
    messageInput.value = ''
  }
})

socket.on('chatMessage', (msg) => {
  displayMessage(msg)
})

function displayMessage(msg) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<strong>${msg.sender}</strong>: ${msg.message}`
  chatMessages.appendChild(div)
}

logoutBtn.addEventListener('click', () => {
  token = null
  userId = null
  chatContainer.style.display = 'none'
  document.getElementById('authContainer').style.display = 'block'
})
