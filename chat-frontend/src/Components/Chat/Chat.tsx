import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import io, { Socket } from "socket.io-client";
import Swal from "sweetalert2";

// Styles
import styles from "./Chat.module.css";
import { textFieldsStyles } from "./ChatComponetsStyles";

// Intefaces
import { IChatProps, IMessage, IPayload } from "../../Interface/Chat.Interface";

// Components
import { Button, TextField } from "@mui/material";
import { IoMdSend,IoIosLogOut } from "react-icons/io";
import { PiChatsDuotone } from "react-icons/pi";



const Chat: React.FC<IChatProps> = ({ room, chatDisconnect, name }) => {
  const [title] = useState("Chat");
  const [text, setText] = useState("");
  const [messages, setMessage] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // URL do backend
    const newSocket = io("https://chat-backend-wpzg.onrender.com");
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
    Swal.fire({
      icon: "warning",
      title: "Atenção",
      text: "Deseja sair ?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      confirmButtonColor: "#1976d2",
      cancelButtonText: "Não",
      cancelButtonColor: "red",
    }).then(result => {
      if (result.isConfirmed) {
        if (socket) {
          socket.emit("leaveRoom", room);
          socket.disconnect();
        }
        chatDisconnect();
      }
    });
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleEnterDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const lines = text.split("\n").length;
      if (lines < 4 || text.trim() === "") {
        e.preventDefault();
      }
    }
  };

  return (
    <div className={styles.container} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={styles.content}>
        <h1>{title}<PiChatsDuotone className={styles.chat_icon}/></h1>
        <div className={styles.title_div}>
          <h2>
            Olá, <span className={styles.user_name}>{name}</span>!
          </h2>
          <Button type="button" onClick={disconnect} className={styles.disconnectButton}>
            Desconectar <IoIosLogOut className={styles.disconnect_icon}/>
          </Button>
        </div>
        <div className={styles.card}>
          <ul>
            {messages.map(message => (
              <li className={message.name === name ? styles.myMessage : styles.otherMessage} key={message.id}>
                <span>
                  <span className={styles.user_name}>{message.name} </span>diz:
                </span>
                <p className={styles.messages}>{message.text}</p>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </div>

        <div className={styles.button_div}>
          <TextField
            sx={textFieldsStyles}
            key="message-textfield"
            id="outlined-multiline-flexible"
            label="Digite uma mensagem"
            multiline
            maxRows={4}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleEnterDown}
          />
          <Button type="button" onClick={() => sendMessage()}>
            <IoMdSend />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
