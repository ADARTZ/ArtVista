
import axios from "../axios";
import React, { useState } from "react";
import styled from "styled-components";
function AddProduct() {
    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [artistname, setArtistname] = useState("");
    const [artdescription, setArtdescription] = useState("");

    const addProduct = (e) => {
        e.preventDefault();

        axios
            .post("/products/add", { title, imageURL, price, rating, description, artistname, artdescription })
            .then(() => {
                setTitle("");
                setImageURL("");
                setPrice(0);
                setRating(0);
                setDescription("");
                setArtdescription("");
                setArtistname("");
            })
            .catch((error) => alert(error.message));
    };
    return (
        <Main>
        <Container>

            <FormContainer>
                <h3>Add Product</h3>

                <InputContainer>
                    <p>Title</p>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </InputContainer>
                <InputContainer>
                    <p>ImageURL</p>
                    <input
                        type="text"
                        onChange={(e) => setImageURL(e.target.value)}
                        value={imageURL}
                    />
                </InputContainer>
                <InputContainer>
                    <p>Price</p>
                    <input
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </InputContainer>
                <InputContainer>
                    <p>Rating</p>
                    <input
                        type="number"
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                    />
                </InputContainer>

                <InputContainer>
                    <p>Description</p>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </InputContainer>
                <InputContainer>
                    <p>Artist Name</p>
                    <input
                        type="text"
                        onChange={(e) => setArtistname(e.target.value)}
                        value={artistname}
                    />
                </InputContainer>
                <InputContainer>
                    <p>Art Description</p>
                    <input
                        type="text"
                        onChange={(e) => setArtdescription(e.target.value)}
                        value={artdescription}
                    />
                </InputContainer>
                <Button onClick={addProduct}>Add Product</Button>
            </FormContainer>
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
  height: fit-content;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center; 
  background-color:rgb(254,254,254,0.4);
  border-radius: 10px;
  


`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color:rgb(254,254,254,0.1);
  border-radius: 10px;

  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
   
    font-weight: bold;

    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;

  p {
    font-size: 18px;
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
      border: 1px white;
    }
  }
`;

const Button = styled.button`
  width: 70%;
  height: 35px;
  // background-color: #f3b414;
  background-color: black;
  color:#ffffff;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;

  &:hover {
    backgroun-color: grey;
    cursor: pointer;
  }
`;

export default AddProduct;