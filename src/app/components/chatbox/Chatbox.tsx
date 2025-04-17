"use client"

import React, { useState } from 'react';
import styles from './ChatBox.module.css'; // Import the CSS file for styling

// Define TypeScript types for chat messages
interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

// ChatBox Component
const ChatBox: React.FC = () => {
    const [chats, setChats] = useState<ChatMessage[]>([
        {
            id: 1,
            text: "Hello, I am Alice your assistant, How can I help you",
            sender: 'bot',
        }
    ]);
    const [input, setInput] = useState<string>('');

    const handleSend = () => {
        if (input.trim() !== '') {
            const newChat: ChatMessage = {
                id: chats.length + 1,
                text: input,
                sender: 'user',
            };
            setChats([...chats, newChat]);
            setInput(''); // Clear input field
        }
    };

    return (
        <div className={styles.chatboxContainer}>
            <div className={styles.chatboxMessages}>
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`${styles.chatMessage} ${chat.sender === 'user' ? styles.userMessage : styles.botMessage}`}
                    >
                        {chat.text}
                    </div>
                ))}
            </div>
            <div className={styles.chatboxInputContainer}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={styles.chatboxInput}
                />
                <button onClick={handleSend} className={styles.chatboxSendButton}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
