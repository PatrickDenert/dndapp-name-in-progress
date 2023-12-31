
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate()
  function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.token()
       navigate("/")
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
            <Button onClick={logMeOut} sx={{ my: 2, color: 'white', display: 'block' }}>
                Logout
            </Button>
    )
}

export default Header;