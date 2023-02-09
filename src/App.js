import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Form from "./components/Form";
import Cancellation from './components/Cancellation';

function App() {
  const [customer, setCustomer] = useState();
  const [timeslot, setTimeslot] = useState();

  // get url paramenter
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const hmac = queryParams.get("hmac");

  // get customer details
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:3333/${token}/${hmac}`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    fetchDetails().then(data=> {
      setCustomer(data.customer);
      setTimeslot(data.timeslot);
    });
  }, [token, hmac])

  return (
    <div className="App">

      {customer && 
      <>
        <div>
          {timeslot
            ? <Cancellation customer={customer} timeslot={timeslot} token={token} hmac={hmac} />
            : <Form customer={customer} timeslot={timeslot} token={token} hmac={hmac} />
          }
        </div>
      </>
      }
    </div>
  );
}

export default App;
