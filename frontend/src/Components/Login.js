import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useStateValue } from "../StateProvider";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ }, dispatch] = useStateValue();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        if (!res.data.error) {
          dispatch({
            type: "SET_USER",
            user: res.data,
          });
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        } else if (res.data.error) {
          alert(res.data.error);
        }
      })
      .catch((err) => console.warn(err));
  };

  return (
    <Main>
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="./img.jpg" alt="" />
      </Logo>
      <FormContainer>
        <h3>Sign In</h3>
        <InputContainer>
          <p>Email address</p>
          <input
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputContainer>
        <LoginButton onClick={login}>Sign In</LoginButton>
        <InfoText>
          By continuing, you agree to AdArtz's{" "}
          <span>Conditions of Use </span>and <span> Privacy Notice</span>.
        </InfoText>
      </FormContainer>
      <SignUpButton onClick={() => navigate("/signup")}>
        Create your AdArtz account
      </SignUpButton>
    </Container>
    </Main>
  );
}
const Main= styled.div`
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
  width: 55%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 5px;
  margin-bottom: 30px;
  color : white;
  padding-right:50px;
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  color : white;
  p {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    height: 50px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    font-size: 16px;
    margin-top: 5
    `;

const Button = styled.button`
width: 100 %;
height: 50px;
margin - top: 20px;
border - radius: 5px;
border: none; background - color: #0077ff;
color: #fff;
font - size: 18px;
font - weight: 600;
cursor: pointer; &:hover { background - color: grey; }`;


const LoginButton = styled.button`
  // background-color: #f1f1f1;
  background-color: rgb(0,0,0,0.7);
  // color: #8d5524;
  color: #ffff;
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
    color:black;
  }
`;

const InfoText = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 20px;

  span {
    font-weight: 600;
  }
`;
const SignUpButton = styled.button`
  // background-color: #8d5524;
   background-color: rgb(0,0,0,0.5);
  // color: #fff;
  color: white;
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
    color:black;
  }
`;

export default Login;