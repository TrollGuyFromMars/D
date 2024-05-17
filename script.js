document.addEventListener("DOMContentLoaded", () => {
    const messageForm = document.getElementById("messageForm");
    const messageInput = document.getElementById("messageInput");
    const messagesDiv = document.getElementById("messages");

    function fetchMessages() {
        fetch('https://replit.com/@laiklialuke/ok#get_messages.php')
            .then(response => response.json())
            .then(data => {
                messagesDiv.innerHTML = "";
                data.forEach(message => {
                    const messageElement = document.createElement("div");
                    messageElement.classList.add("message");
                    messageElement.textContent = message.text;
                    messagesDiv.appendChild(messageElement);
                });
            });
    }

    messageForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = messageInput.value.trim();
        if (text) {
            fetch('https://replit.com/@laiklialuke/ok#submit_message.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            }).then(response => response.json())
              .then(data => {
                  if (data.success) {
                      messageInput.value = "";
                      fetchMessages();
                  } else {
                      alert("Failed to submit message");
                  }
              });
        }
    });

    fetchMessages();
});
