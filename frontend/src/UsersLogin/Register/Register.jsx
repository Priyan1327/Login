import { useState } from "react"
import "./Register.css"
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUser} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name,setName]=useState("");

  const [mail,setMail]=useState("");

  const [password,setPasswword]=useState("")


const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register button is clicked");

    if (!name || !mail || !password) {
        alert(" 👉 Please provide all fields");
        return;
    }

    try { // Fetching the data from backend.. using fetch
        console.log("Sending request to backend...");

        const response = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ name, mail, password })
        });
        
        // Converting the API in a json method by using a variable called data. the data is a variable that store the recived data.
        const data = await response.json();
        console.log("Response from backend:", data);
        
        // if data is sucesss the message should be poped in a way 
        if (data.success) {
            alert(`Welcome ${data.data.name}, Registration Successful!😊 `);
            navigate("/");
        } else {
            alert("Registratin is Sucessfull. Plese login now 👍 ");
        }
    } // print the try block is not working..
      catch (err) {
        console.error("Error:", err);
        alert("Server Error. Please try again 😑 ");
      }
};

  
  return (
      <div className="wraper">
        <form action="">

            <h1>Register</h1>

            <div className="input-box">
              <input type="text" placeholder="Username" value={name}  onChange={(e)=>{setName(e.target.value)}}/>
              <FaUser className="icons"/>
            </div>

            <div className="input-box">
              <input type="email" placeholder="Email" value={mail}  onChange={(e)=>{setMail(e.target.value)}}/>
              <MdEmail className="icons"/>
            </div>

            <div className="input-box">
              <input type="password" placeholder="password" value={password}  onChange={(e)=>{setPasswword(e.target.value)}}/>
               <IoMdLock className="icons"/>
            </div>
             
           <div className="Button">
              <button type="submit" className="BTN" onClick={handleRegister}>Register</button>
           </div>

        </form>
      </div>
  )
}

export default Register