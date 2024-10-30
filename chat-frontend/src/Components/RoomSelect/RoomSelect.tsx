import React, { useState } from "react";

// Styles
import styles from "./RoomSelect.module.css";

//Interface
import { IRoomSelectProps } from "../../Interface/RoomSelect.Interface";

const RoomSelect: React.FC<IRoomSelectProps> = ({ onRoomSelect }) => {
  const [selectedRoom, setSelectedRoom] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Escolha uma Sala</h2>
        <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
          <option value="">Selecione uma sala...</option>
          <option value="salaA">Sala A</option>
          <option value="salaB">Sala B</option>
        </select>
        <button type="button" onClick={() => onRoomSelect(selectedRoom)}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default RoomSelect;
