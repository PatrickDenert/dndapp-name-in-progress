import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const Register = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        password_confirm: ""
    })

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        //console.log(newdata)
    }

    function handleSubmit(e){
        e.preventDefault();
        if (data.password === data.password_confirm) {
            axios.post("/register",{
                username: data.username,
                email: data.email,
                password: data.password
            }).then(response=>{
                console.log(response.data)
            }).catch((error) => {
                if (error.response) {
                  console.log(error.response)
                  console.log(error.response.status)
                  console.log(error.response.headers)
                  }
              })}
        else {
            alert("Passwords do not match");
        }
    }
  return (
    <div><h1>Register</h1>
    <form onSubmit={(e) => handleSubmit(e)}>
        <TextField fullWidth label="Username" onChange={(e) => handle(e)} id='username' value={data.username}/>
        <TextField fullWidth label="Email" onChange={(e) => handle(e)} id='email' value={data.email}/>
        <TextField fullWidth label="Password" onChange={(e) => handle(e)} id='password' value={data.password}/>
        <TextField fullWidth label="Confirm Password" onChange={(e) => handle(e)} id='password_confirm' value={data.password_confirm}/>
        <Button type='submit' variant='contained'>Register</Button>
    </form>
    </div>

  )
}

export default Register