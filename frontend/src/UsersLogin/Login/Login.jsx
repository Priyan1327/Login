import React, { useState } from 'react'
import "./Login.css"
import { FaUser} from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from 'react-router-dom';



function Login() {
    
    const Navigate = useNavigate();

    const[ name , setName] = useState("");

    const [ password , setPasswword] = useState("");

    const fetchdata = async (e) => {
     
          e.preventDefault();

          if(!name || !password){
            alert(" 👉 Please Enter UserName and Password");
            return;
          }
          try{
            // geting the data using a variable called---response
            // geting API from users (Cluster) login()

            const response = await fetch("http://localhost:5000/api/users/login",{
              method : "POST",
              headers : {"content-Type":"application/json"},
              body : JSON.stringify({ name , password},)
            });

            if(!response){
              throw new Error("HTTPS error" + response.status)
            }
              // Conveeting the data into JSON format by declaring a variable called data.
            const data = await response.json();

             if(data.success){
              alert( data.message )
             }else{
              alert("User Not Found.Please Register to Login 😊 ")
             }
         }catch(err){
          console.error("Error:",err)
             alert("Server Error.Please Try angain later 😑 ")
          };

     };  



    return(
           
           
       <div className="Continer">

        <form action="">

            <h1>Login</h1>

            <div className="inpur-box">
                <input type="text" placeholder="Username" value={name} onChange={(e)=>{setName(e.target.value)}} />
                 <FaUser className='icon'/>
            </div>

            <div className="inpur-box">
                <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPasswword(e.target.value)}} />
                <IoMdLock className='icon'/>
            </div>

            <div className="btns">

                  <button type="submit" className="btn1" onClick={fetchdata}> Login </button>
                  
                  <button className="btn2" onClick={() => Navigate("/register")} > Register </button>

            </div>

        </form>

    </div>                     
    )

 };

 export default Login;