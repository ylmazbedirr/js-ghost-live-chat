// Import Firebase SDK from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDIXmVg3RBTUfW0ZpJg4WqLNZm1N41tf9k",
  authDomain: "livechatlove-d3f30.firebaseapp.com",
  databaseURL: "https://livechatlove-d3f30-default-rtdb.firebaseio.com",
  projectId: "livechatlove-d3f30",
  storageBucket: "livechatlove-d3f30.firebasestorage.app",
  messagingSenderId: "26567125344",
  appId: "1:26567125344:web:cfc388c285c5ce8ec75605",
  measurementId: "G-R4S7BXSEZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);




//




// Select Elements
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");

// Add messages to the database
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();
  const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // saat ve dakika

  if (username && message) {
    const messagesRef = ref(database, "messages");
    push(messagesRef, { username, message, timestamp }); // zaman damgasını ekle

    messageInput.value = ""; // mesaj alanını temizler
  }
});

// Display messages in real-time
const messagesRef = ref(database, "messages");
onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.innerHTML = `
    <span class="username">${data.username}:</span> 
    ${data.message} 
    <span class="timestamp" style="color: #555; font-size: 0.8rem;">(${data.timestamp})</span>
  `;
  chatBox.appendChild(messageDiv);

  // Scroll to the latest message
  chatBox.scrollTop = chatBox.scrollHeight;
});
