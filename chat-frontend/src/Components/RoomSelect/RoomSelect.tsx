import React, { useState } from "react";
import styles from "./RoomSelect.module.css";

interface RoomSelectProps {
  onRoomSelect: (room: string) => void;
}

const RoomSelect: React.FC<RoomSelectProps> = ({ onRoomSelect }) => {
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoom(e.target.value);
  };

  const joinRoom = () => {
    if (selectedRoom) {
      onRoomSelect(selectedRoom);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Escolha uma Sala</h2>
        <select value={selectedRoom} onChange={handleRoomChange}>
          <option value="">Selecione uma sala...</option>
          <option value="salaA">Sala A</option>
          <option value="salaB">Sala B</option>
        </select>
        <button type="button" onClick={joinRoom}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default RoomSelect;
