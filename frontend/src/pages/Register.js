import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {

  const [name , setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //Posting to server for registration
   const onSubmit= async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('https://lingo-lab.vercel.app/api/register', {
        name: name,
        email: email,
        password: password
      })
      
      if(response.data === 'Registered'){
        alert("User Successfully Registered");
        navigate('/login');
      }else{
        console.log("error");
      }
      


    }catch{
      throw(Error)
    }
  }

    const navigate = useNavigate();
  return (
    <div className="register">
      <div className="register-form-box">
        <form className="register-form" onSubmit={onSubmit}>
          <span className="register-title">Register</span>
          <span className="register-subtitle">Create a free account with your email.</span>
          <div className="register-form-container">
            <input type="text" className="register-input" placeholder="Full Name" onChange={(e)=>setName(e.target.value)}/>
            <input type="email" className="register-input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className="register-input" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="register-form-section">
          <p>
            Have an account? <span onClick={()=>navigate("/login")}>Log in</span>{" "}
          </p>
        </div>
      </div>
      <div className="title-mascot">
        <div><h1 className="title">LingoLab</h1>
        <h3 className="caption">"Your Journey to Fluency Begins Here"</h3></div>
        <div><img className="mascot" src="image1.png" alt="mascot" /></div>      
      </div>
    </div>
  );
};

export default Register;
