import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const Login = (props) => {
  const [data, setData] = useState({
    username: "",
    password: "",
})

function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    //console.log(newdata)
}

function handleSubmit(e){
    e.preventDefault();
        axios.post("/login",{
            username: data.username,
            password: data.password
        }).then(response=>{
            console.log(response)
            props.setToken(response.data.access_token)
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              }
          })
}
return (
<div><h1>Log in</h1>
<form onSubmit={(e) => handleSubmit(e)}>
    <TextField fullWidth label="Username" onChange={(e) => handle(e)} id='username' value={data.username}/>
    <TextField fullWidth label="Password" onChange={(e) => handle(e)} id='password' value={data.password}/>
    <Button type='submit' variant='contained'>Log In</Button>
</form>
</div>

)
}


export default Login