import React, { useState } from "react";

// Styles
import styles from "./RoomSelect.module.css";

//Interface
import { IRoomSelectProps } from "../../Interface/RoomSelect.Interface";

const RoomSelect: React.FC<IRoomSelectProps> = ({ onRoomSelect, onNameSelect }) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [name, setName] = useState("");

  const handleEnterRoom = () => {
    if (selectedRoom && name) {
      onRoomSelect(selectedRoom);
      onNameSelect(name);
    } else if (!selectedRoom && name) {
      alert("Por favor, selecione uma sala.");
    } else if (selectedRoom && !name) {
      alert("Por favor, digite seu nome.");
    } else {
      alert("Por favor, selecione uma sala e digite seu nome.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEnterRoom();
    }
  };

  return (
    <div className={styles.container} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={styles.content}>
        <h2>Escolha uma Sala e digite seu Nome para Conversar</h2>
        <p>Por favor, selecione uma sala e insira seu nome antes de entrar no chat.</p>

        <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
          <option value="">Selecione uma sala...</option>
          <option value="salaA">Sala A</option>
          <option value="salaB">Sala B</option>
        </select>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Digite seu nome..." />
        <button type="button" onClick={handleEnterRoom}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default RoomSelect;
