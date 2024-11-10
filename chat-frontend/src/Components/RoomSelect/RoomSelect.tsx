import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Styles
import styles from "./RoomSelect.module.css";
import { inputNameStyles, selectRoomStyles } from "./RoomSelectComponentsStyles";

//Interface
import { IRoomSelectProps } from "../../Interface/RoomSelect.Interface";

// Components
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const MySwal = withReactContent(Swal);

const RoomSelect: React.FC<IRoomSelectProps> = ({ onRoomSelect, onNameSelect }) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [name, setName] = useState("");

  const handleEnterRoom = () => {
    if (selectedRoom && name) {
      onRoomSelect(selectedRoom);
      onNameSelect(name);
    } else if (!selectedRoom && name) {
      MySwal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Por favor, selecione uma sala.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#1976d2",
      });
    } else if (selectedRoom && !name) {
      MySwal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Por favor, digite seu nome.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#1976d2",
      });
    } else {
      MySwal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Por favor, selecione uma sala e digite seu nome.",
        confirmButtonText: "Ok",
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
        <h2>
          Escolha uma <b>sala</b> e digite seu <b>nome</b> para começar a conversar
        </h2>
        <p>Por favor, selecione uma sala e insira seu nome antes de entrar no chat.</p>

        <FormControl sx={selectRoomStyles}>
          <InputLabel id="roomLabel" required>Sala do chat</InputLabel>
          <Select labelId="roomLabel" id="roomSelect" label="Sala do chat" value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} required>
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
