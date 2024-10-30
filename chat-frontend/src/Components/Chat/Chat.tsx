import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import io, { Socket } from "socket.io-client";

import styles from "./Chat.module.css";

interface Message {
  id: string;
  name: string;
  text: string;
}

interface Payload {
  name: string;
  text: string;
  room: string;
}

// const socket = io("http://localhost:3333");

interface ChatProps {
  room: string;
  chatDisconnect: () => void;
}

const Chat: React.FC<ChatProps> = ({ room, chatDisconnect }) => {
  const [title] = useState("Web Chat");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessage] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3333");
    setSocket(newSocket);

    newSocket.emit("joinRoom", room);

    newSocket.on("receiveMessage", (message: Payload) => {
      const newMessage: Message = {
        id: nanoid(),
        name: message.name,
        text: message.text,
      };
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      newSocket.emit("leaveRoom", room);
      newSocket.disconnect();
    };
  }, [room]);

  function validateInput() {
    return name.length > 0 && text.length > 0;
  }

  function sendMessage() {
    if (validateInput()) {
      const message: Payload = {
        name,
        text,
        room,
      };

      setText("");
      if(socket) {
        socket.emit("sendMessage", message);
      }
    }
  }

  function disconnect() {
    if(socket) {
      socket.emit("leaveRoom", room);
      socket.disconnect();
    }
    chatDisconnect();
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

        <button
          type="button"
          onClick={disconnect}
          className={styles.disconnectButton}
        >
          Desconectar
        </button>
      </div>
    </div>
  );
};

export default Chat;
