import axios from 'axios';
import { Button, Dialog, DialogActions, DialogTitle, Box } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Cancellation = ({customer, timeslot, token, hmac}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:3333/${token}/${hmac}`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }

  const handleDelete = (e) => {
    deleteRequest()
     .then(()=>window.location.reload(false))
     .then(data=>console.log(data));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
    <Box 
        maxWidth={500}
        display="flex" 
        flexDirection={"column"} 
        alignItems="center" 
        justifyContent={"center"}
        boxShadow="2px 2px 10px rgba(0,0,0,0.2)"
        padding={3}
        margin="auto"
        marginTop={5}
      >
        <p>Ihr Termin ist am: {timeslot}</p>
        <Button variant="contained" color="error" onClick={handleClickOpen}><DeleteForeverIcon></DeleteForeverIcon> Termin stornieren</Button> 
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Wollen Sie den Termin wirklich löschen?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Nein</Button>
          <Button onClick={handleDelete} autoFocus>
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Cancellation