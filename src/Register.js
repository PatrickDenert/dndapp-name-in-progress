import { Alert, AlertTitle, Button, TextField } from '@mui/material'
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
    const [err, setErr] = useState([])
    const [success, setSuccess] = useState([])

    function handleSubmit(e){
        e.preventDefault();
        if (data.password === data.password_confirm) {
            axios.post("/register",{
                username: data.username,
                email: data.email,
                password: data.password
            }).then(response=>{
                console.log(response.data)
                setSuccess("Success")
                setErr("");
            }).catch((error) => {
                if (error.response) {
                  console.log(error.response)
                  setErr(error.response.data);
                  console.log(err)
                  setSuccess("")
                  }
              })
            }
        else {
            setErr("Passwords do not match");
            console.log(err)
        }
    }
  return (
    <div><h1>Register</h1>
    <form onSubmit={(e) => handleSubmit(e)}>
        {err.length > 0 &&
            <Alert severity='error'>
                <AlertTitle>{err}</AlertTitle>
            </Alert>
        }

        {success.length > 0 &&
            <Alert severity='success'>
                <AlertTitle>Account Created Successfully</AlertTitle>
            </Alert>
        }

        <TextField error={err === "Email is taken" | err === "Account Exists"} fullWidth label="Email" onChange={(e) => handle(e)} id='email' value={data.email}/>
        <TextField error={err === "Username is taken" | err === "Account Exists"} fullWidth label="Username" onChange={(e) => handle(e)} id='username' value={data.username}/>
        <TextField fullWidth type="password" label="Password" onChange={(e) => handle(e)} id='password' value={data.password} />
        <TextField error={err === "Passwords do not match"} fullWidth type="password" label="Confirm Password" onChange={(e) => handle(e)} id='password_confirm' value={data.password_confirm}/>
        <Button type='submit' variant='contained'>Register</Button>
    </form>
    </div>

  )
}

export default Register