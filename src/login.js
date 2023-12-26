import { Alert, AlertTitle, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [data, setData] = useState({
    username: "",
    password: "",
})
const [err, setErr] = useState([])
function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    //console.log(newdata)
}
const navigate = useNavigate()
function handleSubmit(e){
    e.preventDefault();
        axios.post("/login",{
            username: data.username,
            password: data.password
        }).then(response=>{
            console.log(response)
            props.setToken(response.data.access_token)
            navigate('/profile')
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              setErr(error.response.data.message);
              }
          })
}
return (
<div><h1>Log in</h1>
{err.length > 0 &&
    <Alert severity='error'>
        <AlertTitle>{err}</AlertTitle>
    </Alert>
}
<form onSubmit={(e) => handleSubmit(e)}>
    <TextField fullWidth label="Username" onChange={(e) => handle(e)} id='username' value={data.username}/>
    <TextField fullWidth label="Password" onChange={(e) => handle(e)} id='password' value={data.password}/>
    <Button type='submit' variant='contained'>Log In</Button>
</form>
</div>

)
}


export default Login