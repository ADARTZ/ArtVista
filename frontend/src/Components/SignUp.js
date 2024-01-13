import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();
    axios
      .post("/auth/signup", { email, password, fullName })
      .then((res) => alert(res.data.message))
      .catch((err) => console.warn(err));

    navigate("/login");
  };

  return (
    <Main>
    <Container>
      <Logo>
        <img src="./img.jpg" alt="Logo" />
      </Logo>
      <FormContainer>
        <h3>Create Account</h3>
        <InputContainer>
          <p>Full Name</p>
          <input
            type="text"
            placeholder="Enter your full name"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </InputContainer>
        <InputContainer>
          <p>Email</p>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputContainer>
        <SignUpButton onClick={signup}>Create Account</SignUpButton>
      </FormContainer>
      <LoginButton onClick={() => navigate("/login")}>
        Back to Login
      </LoginButton>
    </Container>
    </Main>
  );
}
const Main=styled.div`
background: rgba(0,0,0,0.7) url('../levi.jpeg');
background-size: cover;
background-blend-mode: darken;
background-attachment: scroll;
background-repeat: repeat-y;

`

const Container = styled.div`
width: 40%;
min-width: 450px;
background-color:rgba(254, 254, 254, 0.3);
height: fit-content;
padding: 15px;
margin: auto;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 10px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);

`;

const Logo = styled.div`
width: 200px;
height: 200px;
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 30px;

img {
  border-radius: 50%;
  border: 5px solid white;
  width: 150px;
  height : 150px;
}
`;

const FormContainer = styled.form`
border: 2px solid black;
width: 80%;
max-width: 300px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding-left: 40px;
padding-bottom: 30px;
padding-right: 55px;
border-radius: 5px;
margin-bottom: 20px;
color : Black;
font-size: 24px;
padding-top: 10px;
`;

const InputContainer = styled.div`
  width: 100%;
  

  padding-top: 10px;

  p {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    color: white;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: #f1f1f1;
    font-size: 18px;
    color: black;
    font-weight: 600;

    &:focus {
      outline: none;
     
      box-shadow: 0 0 5px #8d5524;
    }
    }
    `;
const SignUpButton = styled.button`
margin-top:25px;
background-color: rgb(0,0,0,0.7);
color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid white;

  &:hover {
    background-color: grey;
    color:black;  }
`;

const LoginButton = styled.button`
background-color: rgb(0,0,0,0.5);
color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  margin-right:20px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid white;

  &:hover {
    background-color: grey;
    color:black;  }
`;

export default SignUp;