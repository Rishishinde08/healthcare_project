// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const voiceBtn = document.getElementById('voice-btn');

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
voiceBtn.addEventListener('click', toggleVoiceRecognition);

// Speech Recognition Setup
let recognition;
try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        voiceBtn.classList.remove('listening');
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        voiceBtn.classList.remove('listening');
        addMessage("Sorry, I couldn't understand your voice input. Please try typing instead.", 'bot');
    };
} catch (e) {
    console.warn('Speech recognition not supported', e);
    voiceBtn.style.display = 'none';
}

// Functions
function sendMessage() {
    const message = userInput.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        
        showTypingIndicator();
        
        // Simulate API call (replace with actual OpenAI API call)
        setTimeout(() => {
            removeTypingIndicator();
            generateAIResponse(message);
        }, 1500);
    }
}

function toggleVoiceRecognition() {
    if (!recognition) {
        addMessage("Voice input is not supported in your browser. Please type your question.", 'bot');
        return;
    }
    
    if (voiceBtn.classList.contains('listening')) {
        recognition.stop();
        voiceBtn.classList.remove('listening');
    } else {
        voiceBtn.classList.add('listening');
        recognition.start();
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.remove();
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    // This would be replaced with actual OpenAI API call
    const responses = [
        "I can provide general information about that. However, please consult with a doctor for personal medical advice.",
        "Based on common symptoms, this might indicate several conditions. The most common would be... (remember I'm not a doctor)",
        "That medication is typically used for... Common side effects include... Always follow your doctor's instructions.",
        "For those symptoms, it's recommended to seek medical attention if they persist for more than 3 days or worsen suddenly.",
        "While I can share general health information, I must emphasize that only a qualified healthcare professional can properly assess your specific situation."
    ];
    
    // Simple keyword matching for demo purposes
    let response;
    if (userMessage.toLowerCase().includes('emergency') || 
        userMessage.toLowerCase().includes('urgent')) {
        response = "This sounds serious. Please contact emergency services or go to the nearest hospital immediately.";
        addMessage(response, 'bot warning');
    } else if (userMessage.toLowerCase().includes('symptom')) {
        response = "Symptoms can vary widely between individuals. The most common symptoms for this condition are... but please consult a doctor for proper evaluation.";
        addMessage(response, 'bot medical-info');
    } else if (userMessage.toLowerCase().includes('medic') || 
               userMessage.toLowerCase().includes('drug') || 
               userMessage.toLowerCase().includes('pill')) {
        response = "Medications should always be taken as prescribed by your doctor. Common information about this medication includes...";
        addMessage(response, 'bot medical-info');
    } else {
        response = responses[Math.floor(Math.random() * responses.length)];
        addMessage(response, 'bot');
    }
}

// Initialize with welcome message
scrollToBottom();





  function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
    document.getElementById("navButtons").classList.toggle("active");
  }



//   chatbox 





  const witToken = "Bearer 4QJ4VHBMYD4VWZ6EYZRWNCD2ZCD6K4KM";

  function toggleChatbox() {
    const chatbox = document.getElementById("chatbox");
    chatbox.style.display = chatbox.style.display === "flex" ? "none" : "flex";
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      const input = document.getElementById("user-input");
      const message = input.value.trim();
      if (message) {
        addMessage("You", message);
        getWitResponse(message);
        input.value = "";
      }
    }
  }

  function addMessage(sender, message) {
    const chat = document.getElementById("chat-messages");
    const msg = document.createElement("div");
    msg.textContent = `${sender}: ${message}`;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  }

  async function getWitResponse(message) {
    try {
      const res = await fetch("https://api.wit.ai/message?v=20230501&q=" + encodeURIComponent(message), {
        headers: {
          Authorization: witToken,
        },
      });

      const data = await res.json();
      const reply = data?.intents[0]?.name || "Sorry, I didn't understand that.";
      addMessage("Bot", reply);
    } catch (error) {
      addMessage("Bot", "Error connecting to Wit.ai");
    }
  }


  function getWitResponse(message) {
  fetch("https://api.wit.ai/message?v=20230501&q=" + encodeURIComponent(message), {
    headers: {
      Authorization: "4QJ4VHBMYD4VWZ6EYZRWNCD2ZCD6K4KM",
    },
  })
  .then(res => res.json())
  .then(data => {
    const intent = data?.intents[0]?.name || "";
    const reply = getReplyFromIntent(intent);
    addMessage("Bot", reply);
  })
  .catch(() => {
    addMessage("Bot", "hey this is a hackathon ai bot");
  });
}

function getReplyFromIntent(intent) {
  switch (intent) {
    case "greet":
      return "Hello! How can I assist you today?";
    case "get_hospital_info":
      return "Sure! What disease or location are you looking for?";
    case "goodbye":
      return "Take care! 👋";
    default:
      return "Sorry, I didn't understand that.";
  }


}



// toggle emergency button 

 function toggleEmergencyPanel(event) {
  const panel = document.getElementById("emergency-panel");
  const tab = document.getElementById("emergency-tab");

  if (panel.classList.contains("active")) {
    
    panel.classList.remove("active");
    tab.style.display = "flex";

   
    document.removeEventListener("click", outsideClickListener);
  } else {
   
    panel.classList.add("active");
    tab.style.display = "none";

   
    setTimeout(() => {
      document.addEventListener("click", outsideClickListener);
    }, 0);
  }

  event.stopPropagation(); 
}

function outsideClickListener(event) {
  const panel = document.getElementById("emergency-panel");
  const tab = document.getElementById("emergency-tab");

  if (!panel.contains(event.target) && !tab.contains(event.target)) {
    panel.classList.remove("active");
    tab.style.display = "flex";
    document.removeEventListener("click", outsideClickListener);
  }
}


// log in page 