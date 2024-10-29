import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import io from "socket.io-client";

import styles from "./Chat.module.css";

interface Message {
  id: string;
  name: string;
  text: string;
}

interface Payload {
  name: string;
  text: string;
}

const socket = io("http://localhost:3333");

const Chat: React.FC = () => {
  const [title] = useState("Web Chat");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessage] = useState<Message[]>([]);

  useEffect(() => {
    function receiveMessage(message: Payload) {
      const newMessage: Message = {
        id: nanoid(),
        name: message.name,
        text: message.text,
      };

      setMessage([...messages, newMessage]);
    }

    socket.on("receiveMessage", (message: Payload) => {
      receiveMessage(message);
    });
  }, [messages, name, text]);

  function validateInput() {
    return name.length > 0 && text.length > 0;
  }

  function sendMessage() {
    if (validateInput()) {
      const message: Payload = {
        name,
        text,
      };

      setText("");
      socket.emit("sendMessage", message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome..."
        />
        <div className={styles.card}>
          <ul>
            {messages.map((message) => {
              if (message.name === name) {
                return (
                  <li className={styles.myMessage} key={message.id}>
                    <span>
                      {message.name}
                      {" diz:"}
                    </span>
                    <p>{message.text}</p>
                  </li>
                );
              }

              return (
                <li className={styles.otherMessage} key={message.id}>
                  <span>
                    {message.name}
                    {" diz:"}
                  </span>
                  <p>{message.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Digite uma mensagem"
        />
        <button type="button" onClick={() => sendMessage()}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
