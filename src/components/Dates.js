import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Dates = ({estimatedWeek, token, hmac}) => {
  const [day, setDay] = useState();

  // get customer details
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:3333/${token}/${hmac}/time-slots/`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }

  console.log(estimatedDay);
  
  console.log(dates);


  return (
    <div>
    </div>
  )
}

export default Dates