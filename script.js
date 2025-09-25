// Wait for the entire page to load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GET REFERENCES TO HTML ELEMENTS ---
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input-area input');
    const sendBtn = document.querySelector('.send-btn');
    const welcomeMessage = document.querySelector('.welcome-message');
    


    // --- 2. FUNCTION TO SEND A MESSAGE ---
    const sendMessage = () => {
        const messageText = chatInput.value.trim();

        // If the message is empty, do nothing
        if (messageText === '') {
            return;
        }

        // Hide the welcome message on the first user message
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
        }

        // Add the user's message to the chat window
        addMessageToUI('user', messageText);

        // Clear the input field
        chatInput.value = '';

        // Simulate an AI response after a short delay
        setTimeout(simulateAIResponse, 1200);
    };

    // --- 3. FUNCTION TO ADD A MESSAGE BUBBLE TO THE UI ---
    const addMessageToUI = (sender, message) => {
        // Create a new div element for the message bubble
        const messageBubble = document.createElement('div');
        
        // Add CSS classes for styling
        messageBubble.classList.add('message-bubble', `${sender}-bubble`);
        
        // Set the inner text of the bubble
        messageBubble.innerHTML = `<p>${message}</p>`;
        
        // Append the new bubble to the chat messages container
        chatMessages.appendChild(messageBubble);

        // Scroll to the bottom to see the latest message
        scrollToBottom();
    };

    // --- 4. FUNCTION TO SIMULATE AI RESPONSE ---
    const simulateAIResponse = () => {
        // Show a "typing" indicator
        showTypingIndicator();

        // A list of pre-programmed, random responses for simulation
        const randomResponses = [
            "আপনার প্রশ্নটি খুবই চমৎকার। আমাকে একটু ভাবতে দিন...",
            "আমি আপনার বিষয়টি বুঝতে পেরেছি। এর সমাধান হলো...",
            "এটি একটি গুরুত্বপূর্ণ প্রশ্ন। তথ্য যাচাই করে জানাচ্ছি।",
            "ধন্যবাদ! আমি এই বিষয়ে আরও শিখছি এবং শীঘ্রই আপনাকে সাহায্য করতে পারবো।",
            "আপনার ধৈর্য্যের জন্য ধন্যবাদ। আমি উত্তরটি প্রস্তুত করছি।"
        ];

        // Pick a random response from the array
        const randomResponse = randomResponses[Math.floor(Math.random() * randomResponses.length)];
        
        // Wait for a bit (like the AI is "thinking"), then show the response
        setTimeout(() => {
            // Remove the typing indicator
            removeTypingIndicator();
            // Add the AI's message to the UI
            addMessageToUI('ai', randomResponse);
        }, 1500); // Wait 1.5 seconds before "replying"
    };
    
    // --- 5. FUNCTIONS FOR TYPING INDICATOR ---
    const showTypingIndicator = () => {
        const typingBubble = document.createElement('div');
        typingBubble.classList.add('message-bubble', 'ai-bubble', 'typing-indicator');
        typingBubble.innerHTML = `
            <p>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </p>
        `;
        chatMessages.appendChild(typingBubble);
        scrollToBottom();
    }

    const removeTypingIndicator = () => {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // --- 6. FUNCTION TO SCROLL THE CHAT WINDOW ---
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // --- 7. EVENT LISTENERS ---
    // Send message when the send button is clicked
    sendBtn.addEventListener('click', sendMessage);

    // Send message when the "Enter" key is pressed in the input field
    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});