export const selectRoomStyles = {
  m: 1,
  width: "80%", // Largura ocupando 80% do contêiner pai
  background: '#fff',
  borderRadius: "4px",
  "& .MuiInputLabel-root": {
    color: "gray",
    fontWeight: "bold",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#1976d2", // Cor do rótulo ao focar
  },
  "& .MuiSelect-root": {
    backgroundColor: "#f9f9f9", // Cor de fundo do campo selecionado
    borderRadius: 2,
  },
  "& .MuiSelect-root.Mui-focused": {
    backgroundColor: "#f3f4f6", // Cor de fundo ao focar
  },
  "& .MuiMenuItem-root": {
    color: "#555",
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "#e0e0e0",
  },
  "& .Mui-selected": {
    backgroundColor: "#cfe8fc",
    color: "#1976d2",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      border: "2px solid #1976d2",
      borderColor: "#1976d2", // Cor da borda ao passar o mouse
    },
  },
};

export const inputNameStyles = {
  m: 1,
  width: "80%", 
  background: '#fff',
  borderRadius: "4px",
  "& .MuiInputLabel-root": {
    color: "gray",
    fontWeight: "bold",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff", //
    "&:hover fieldset": {
      border: "2px solid #1976d2",
      borderColor: "#1976d2", // Cor da borda ao passar o mouse
    },
  },
}
