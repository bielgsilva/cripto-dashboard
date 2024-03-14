import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <Box
    padding="20px">
      <Header title="Bloco de Notas" />

      <TextField
        label="Adicionar Nota"
        variant="outlined"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        fullWidth
        margin="normal"
        
        
      />
      <Button variant="contained" onClick={handleAddNote}>
        Adicionar
      </Button>
      <List>
        {notes.map((note, index) => (
          <Box key={index}>
            <ListItem>
              <ListItemText primary={note} />
              <IconButton onClick={() => handleDeleteNote(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Notes;
