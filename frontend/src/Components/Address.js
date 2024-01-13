
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";

import indiaData from "./india-data.json"; 

function Address() {
  const [{ user, address }, dispatch] = useStateValue();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();

  const deliver = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!fullName || !phone) {
      alert("Please fill in your name and phone number.");
      return;
    }

    const phoneRegex = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }
    
      dispatch({
      type: "SET_ADDRESS",
      item: {
        fullName,
        phone,
        flat,
        area,
        city,
        state,
      },
    });

    navigate("/payment");
  };



  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity(""); 
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <Container>
      <Main>
        <FormContainer>
          <InputContainer>
            <p>Full Name</p>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="John Smith"
              value={fullName}
              required
            />
          </InputContainer>
          <InputContainer>
            <p>Phone Number</p>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
            />
          </InputContainer>
          <InputContainer>
            <p>Flat, House no. Building, Company</p>
            <input
              type="text"
              onChange={(e) => setFlat(e.target.value)}
              value={flat}
            />
          </InputContainer>
          <InputContainer>
            <p>Area, Colony, Street</p>
            <input
              type="text"
              onChange={(e) => setArea(e.target.value)}
              value={area}
            />
          </InputContainer>
          <InputContainer>
            <p>Landmark</p>
            <input
              type="text"
              onChange={(e) => setLandmark(e.target.value)}
              value={landmark}
            />
          </InputContainer>
          <InputContainer>
          <p>Town/City</p>
          <select id="stateSelect" value={selectedState} onChange={handleStateChange}>
            <option value="">Select a state</option>
            {Object.keys(indiaData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          </InputContainer>
          <InputContainer>
            <p>City/Province</p>
            <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
            <option value="">Select a city</option>
            {selectedState &&
              indiaData[selectedState].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          </InputContainer>

          <button onClick={deliver}>Deliver to this Address</button>
        </FormContainer>
      </Main>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  // max-width: 1400px;

  margin: auto;
  background-color: rgb(234, 237, 237);

  position: relative;
  background: rgba(0,0,0,0.7) url('../levi.jpeg');
  background-size: cover;
  background-blend-mode: darken;
  background-attachment: scroll;
  background-repeat: repeat-y;

`;

const Main = styled.div`
  padding: 15px;
  
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  
  width: 55%;
  min-width: 400px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: #fff;
  margin: auto;
  border-radius: 20px;
  margin-top: 2rem;

  button {
    // align-self: flex-start;
    // height: 33px;
    // width: 250px;
    // margin-top: 20px;
    // // background-color: #ffa32a;
    // background-color: #0e0242;
    // color:#ffffff;
    // border: none;
    // outline: none;
    // border-radius: 5px;
    // cursor: pointer;
    background-color: #8b4513;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #654321;
    cursor: pointer;
  }
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  margin-left: 2rem;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;

    &:hover {
      border: 1px solid orange;
    }
  }
`;
export default Address;
