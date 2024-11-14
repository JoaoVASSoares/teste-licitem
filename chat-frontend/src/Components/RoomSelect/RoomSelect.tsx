import React, { useState } from "react";
import Swal from "sweetalert2";
import logo from "../../Images/whiteLogo.png";

// Styles
import styles from "./RoomSelect.module.css";
import { inputNameStyles, selectRoomStyles } from "./RoomSelectComponentsStyles";

//Interface
import { IRoomSelectProps } from "../../Interface/RoomSelect.Interface";

// Components
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const RoomSelect: React.FC<IRoomSelectProps> = ({ onRoomSelect, onNameSelect }) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [name, setName] = useState("");

  const handleEnterRoom = () => {
    if (selectedRoom && name) {
      onRoomSelect(selectedRoom);
      onNameSelect(name);
    } else if (!selectedRoom && name) {
      Swal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Por favor, selecione uma sala.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1976d2",
      });
    } else if (selectedRoom && !name) {
      Swal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Por favor, digite seu nome.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1976d2",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Por favor, selecione uma sala e digite seu nome.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1976d2",
      });
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
        {/* <img src={logo} alt="logo" width="200" height="200" style={{ marginBottom: "10px" }} /> */}
        <p className={styles.text}>Bem-vindo ao Chat Licitem!</p>
        <FormControl sx={selectRoomStyles}>
          <InputLabel id="roomLabel" required>
            Sala
          </InputLabel>
          <Select labelId="roomLabel" id="roomSelect" label="Sala" value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} required>
            <MenuItem value="" selected></MenuItem>
            <MenuItem value="roomA">Sala A</MenuItem>
            <MenuItem value="roomB">Sala B</MenuItem>
          </Select>
        </FormControl>
        <TextField id="name" label="Nome" value={name} onChange={e => setName(e.target.value)} required sx={inputNameStyles} />
        <Button type="button" onClick={handleEnterRoom}>
          Entrar
        </Button>
      </div>
    </div>
  );
};

export default RoomSelect;
