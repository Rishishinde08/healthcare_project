
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
