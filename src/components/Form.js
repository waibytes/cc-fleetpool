import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const Form = ({customer, timeslot, token, hmac}) => {
  const [inputs, setInputs] = useState({
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    mobilephone: customer.mobilephone,
    carNumber: customer.carNumber,
    estimatedWeek: customer.estimatedWeek,
    type: customer.type
  });
  const [selectedDate, setSelectedDate] = useState();
  const [times, setTimes] = useState();
  const [appointmentSlot, setAppointmentSlot] = useState();

  Date.prototype.addDays = function(days) {
    var day = new Date(this.valueOf())
    day.setDate(day.getDate() + days);
    return day;
  }
  
  function getDates(startDate, stopDate) {
    var dates = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dates.push({
        date: currentDate
      })
      currentDate = currentDate.addDays(1);
    }
    return dates;
  }

  const fetchTimeslots = async (selectedDate) => {
    const res = await axios.get(`http://localhost:3333/${token}/${hmac}/time-slots/${selectedDate}`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }

  const updateEntry = async () => {
    const res = await axios.post(`http://localhost:3333/${token}/${hmac}`, {
      customer: {
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        email: inputs.email,
        mobilephone: inputs.mobilephone,
        carNumber: inputs.carNumber,
        estimatedWeek: inputs.estimatedWeek,
        type: inputs.type
      },
      timeslot: "2022-03-03T23:00:00.000Z" // appointmentSlot
    }).catch(err=>console.log(err));
    
    const data = await res.data;
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    updateEntry()
      .then(()=>window.location.reload(false))
      .then(data=>console.log(data));
  }

  const handleFormChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // fetchTimeslots(selectedDate)
    //  .then(times=>setTimes(data.timeslots));
  }

  const handleTimeChange = (e) => {
    setAppointmentSlot(e.target.value)
  }
  

  const estimatedDay = new Date(timeslot);
  var dates = getDates(estimatedDay, (estimatedDay).addDays(13));


  return (
    <div>
      
      <form onSubmit={handleSubmit}>

      <Box 
          maxWidth={400}
          display="flex" 
          flexDirection={"column"} 
          alignItems="center" 
          justifyContent={"center"}
          boxShadow="2px 2px 10px rgba(0,0,0,0.2)"
          padding={3}
          margin="auto"
          marginTop={5}
        >

        <FormControl fullWidth sx={{marginTop: 2}}>
        {customer.firstname
          ? <TextField disabled name="firstname" id="firstname" label="Vorname" defaultValue={customer.firstname} variant="outlined" />
          : <TextField onChange={handleFormChange} name="firstname" id="firstname" label="Vorname" defaultValue={customer.firstname} variant="outlined" />
        }
        </FormControl>

        <FormControl fullWidth sx={{marginTop: 2}}>
        {customer.lastname
          ? <TextField disabled name="lastname" id="lastname" label="Nachname" defaultValue={customer.lastname} variant="outlined" />
          : <TextField onChange={handleFormChange} name="lastname" id="lastname" label="Nachname" defaultValue={customer.lastname} variant="outlined" />
        }
        </FormControl>

        <FormControl fullWidth sx={{marginTop: 2}}>
        {customer.email
          ? <TextField disabled name="email" id="email" label="E-Mail" defaultValue={customer.email} variant="outlined" />
          : <TextField onChange={handleFormChange} name="email" id="email" label="E-Mail" defaultValue={customer.email} variant="outlined" />
        }
        </FormControl>

        <FormControl fullWidth sx={{marginTop: 2}}>
        {customer.mobilephone
          ? <TextField disabled name="mobilephone" id="mobilephone" label="Telefon" defaultValue={customer.mobilephone} variant="outlined" />
          : <TextField onChange={handleFormChange} name="mobilephone" id="mobilephone" label="Telefon" defaultValue={customer.mobilephone} variant="outlined" />
        }
        </FormControl>

        {inputs.type == "exchange" && (
        <>
        <FormControl fullWidth sx={{marginTop: 2}}>
        {customer.carNumber
          ? <TextField disabled name="carNumber" id="carNumber" label="Auto ID" defaultValue={customer.carNumber} variant="outlined" />
          : <TextField onChange={handleFormChange} name="carNumber" id="carNumber" label="Auto ID" defaultValue={customer.carNumber} variant="outlined" />
        }
        </FormControl>
        </>
        )}

        <FormControl fullWidth sx={{marginTop: 2}}>
        {customer.estimatedWeek
          ? <TextField disabled name="estimatedWeek" id="estimatedWeek" label="Rückgabe Zeitraum" defaultValue={customer.estimatedWeek} variant="outlined" />
          : <TextField onChange={handleFormChange} name="estimatedWeek" id="estimatedWeek" label="Rückgabe Zeitraum" defaultValue={customer.estimatedWeek} variant="outlined" />
        }
        </FormControl>

        <FormControl fullWidth sx={{marginTop: 2}}>
        {customer.type
          ? <TextField disabled name="type" id="type" label="Termintyp" defaultValue={customer.type} variant="outlined" />
          : <>
          <InputLabel id="label-type">Termintyp Auswählen</InputLabel>
            <Select
              labelId="label-type"
              id="type"
              name="type"
              defaultValue={customer.type}
              label="Termintyp"
              onChange={handleFormChange}
            >
              <MenuItem value="exchange">Tausch</MenuItem>
              <MenuItem value="checkout">Rückgabe</MenuItem>
              <MenuItem value="pickup">Abholung</MenuItem>
            </Select>
            </>
        }
        </FormControl>
        

        {times && 
        <>
        <FormControl fullWidth sx={{marginTop: 2}}>
          <InputLabel id="label-time">Zeit Auswählen</InputLabel>
          <Select
            labelId="label-time"
            id="time"
            name="time"
            defaultValue=""
            label="Termintyp"
            onChange={handleTimeChange}
          >
          {times && times.map((time, index) => (
            <>
            {time.available && 
              <MenuItem value={time.datetime}>{time.datetime}</MenuItem>
            }
            </>
          ))} 
          </Select>
        </FormControl>
        </>
        }

        <Button type="submit" variant="contained" sx={{marginTop: 3}} color="warning">Abschicken</Button>
        </Box>

      </form>
    </div>
  )
}

export default Form

/*


        <FormControl fullWidth sx={{marginTop: 2}}>
          <InputLabel id="label-day">Tag Auswählen</InputLabel>
          <Select
            labelId="label-day"
            id="day"
            name="day"
            defaultValue=""
            label="Termintyp"
            onChange={handleDateChange}
          >
          {dates && dates.map((date, index) => (
            <MenuItem value={date.date}>{date.date}</MenuItem>
          ))} 
          </Select>
        </FormControl>

        {times 
        <FormControl fullWidth sx={{marginTop: 2}}>
          <InputLabel id="label-time">Zeit Auswählen</InputLabel>
          <Select
            labelId="label-time"
            id="time"
            name="time"
            defaultValue=""
            label="Termintyp"
            onChange={handleTimeChange}
          >
          {times && times.map((time, index) => (
            <MenuItem value={time.datetime}>{time.datetime}</MenuItem>
          ))} 
          </Select>
        </FormControl>
        }
*/