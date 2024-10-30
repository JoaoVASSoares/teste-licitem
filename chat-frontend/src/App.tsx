import React, { useState } from "react";

// Styles
import "./App.css";

// Components
import Chat from "./Components/Chat/Chat";
import RoomSelect from "./Components/RoomSelect/RoomSelect";

function App(): JSX.Element {
  const [room, setRoom] = useState<string | null>(null);

  function handleDisconnect() {
    setRoom(null);
  }

  return (
    <div>
      {room ? (
        <Chat room={room} chatDisconnect={handleDisconnect} />
      ) : (
        <RoomSelect onRoomSelect={(selectedRoom) => setRoom(selectedRoom)} />
      )}
    </div>
  );
}

export default App;
