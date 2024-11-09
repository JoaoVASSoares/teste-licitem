import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import io, { Socket } from "socket.io-client";

// Styles
import styles from "./Chat.module.css";

// Intefaces
import { IChatProps, IMessage, IPayload } from "../../Interface/Chat.Interface";

const Chat: React.FC<IChatProps> = ({ room, chatDisconnect, name }) => {
  const [title] = useState("Web Chat - 💬");
  const [text, setText] = useState("");
  const [messages, setMessage] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3333");
    setSocket(newSocket);

    newSocket.emit("joinRoom", room);

    newSocket.on("receiveMessage", (message: IPayload) => {
      const newMessage: IMessage = {
        id: nanoid(),
        name: message.name,
        text: message.text,
      };
      setMessage(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      newSocket.emit("leaveRoom", room);
      newSocket.disconnect();
    };
  }, [room]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function validateInput() {
    return text.length > 0;
  }

  function sendMessage() {
    if (validateInput()) {
      const message: IPayload = {
        name,
        text,
        room,
      };

      setText("");
      if (socket) {
        socket.emit("sendMessage", message);
      }
    }
  }

  function disconnect() {
    if (socket) {
      socket.emit("leaveRoom", room);
      socket.disconnect();
    }
    chatDisconnect();
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles.container} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <div className={styles.title_div}>
          <h2>
            Bem-vindo, <span className={styles.user_name}>{name}</span>!
          </h2>

          <button type="button" onClick={disconnect} className={styles.disconnectButton}>
            Desconectar
          </button>
        </div>
        <div className={styles.card}>
          <ul>
            {messages.map(message => (
              <li className={message.name === name ? styles.myMessage : styles.otherMessage} key={message.id}>
                <span>
                <span className={styles.user_name}>{message.name} </span>diz:</span>
                <p>{message.text}</p>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </div>

        <div className={styles.button_div}>
          <input type="text" onChange={e => setText(e.target.value)} value={text} placeholder="Digite uma mensagem" />
          <button type="button" onClick={() => sendMessage()} title="Enviar mensagem"></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
