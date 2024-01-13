
import React from "react";
import { useStateValue } from "../StateProvider";
import styled from "styled-components";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import { useNavigate } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Footer from "./Footer";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const removeFromBasket = (e, id) => {
    e.preventDefault();

    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  
  return (
    <>
    <Container >
      <Main>
        <ShoppingCart>
          <h2>Shopping Cart</h2>

          {basket?.map((product) => (
            <Product key={product.id}>
              <Image>
                <CardImg top width="100%" src={product.image} alt={product.title} />
              </Image>
              <Description>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{product.title}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      <CurrencyFormat
                        decimalScale={2}
                        value={product.price}
                        displayType="text"
                        thousandSeparator={true}
                        prefix={"₹ "}
                      />
                    </CardSubtitle>
                    <button className="btn btn-danger" onClick={(e) => removeFromBasket(e, product.id)}>Remove</button>
                  </CardBody>
                </Card>
              </Description>
            </Product>
          ))}
        </ShoppingCart>
        <Subtotal>
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  Subtotal ({basket.length} items): <strong>{value}</strong>
                </p>
                <small>
                  <input type="checkbox" />
                  <span>This order contains a gift.</span>
                </small>
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType="text"
            thousandSeparator={true}
            prefix={"₹ "}
          />

          <button className="btn btn-success" onClick={() => navigate("/address")}>
            Proceed to Checkout
          </button>
        </Subtotal>
        </Main>
        {/* <Footer/> */}
    </Container>
    </>

  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-height: 100vh; /* Minimum height to ensure the footer sticks to the bottom */
  background: rgba(0, 0, 0, 0.7) url('../levi.jpeg');
 // background-color: #9e9e9e;
  background-size:cover;
  // background-size: 100% 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-blend-mode: darken;
  
`;

const Main = styled.div`
  display: flex;
  padding: 15px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ShoppingCart = styled.div`
  padding: 15px;
  background-color: rgb(254, 254, 254, 0.2);
  flex: 0.7;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 1200px) {
    flex: none;
  }

  h2 {
    font-weight: bold;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
    margin-bottom: 15px;
    color: white;
    text-align: center;
  }
`;

const Subtotal = styled.div`
  flex: 0.3;
  border-radius: 10px;
  background-color: #fff;
  margin-left: 15px;
  height: fit-content;
  padding: 15px;

  h3 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }

  p {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    margin: 15px 0;
  }

  button {
    background-color: gray;
    color: black;
    border: 1px solid black;
    margin-top: 10px;
    margin-left: 95px;
    padding: 10px 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 7px;
    transition: background-color 0.3s;
    button:hover {
      background-color: black; 
      color: black;
  }
  }
`;

const Product = styled.div`
  display: flex;
  margin-top: 20px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 20px;
  margin-bottom: 1rem;
`;

const Image = styled.div`
  flex: 0.4;
  background-color: #b88a00;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const Description = styled.div`
  flex: 0.6;
  margin-left: 40px;

  .card {
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 0px 5px #fff;
    padding: 10px;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #3c3c3c;
    margin-bottom: 5px;
  }

  .card-subtitle {
    font-size: 1rem;
    font-weight: normal;
    color: #3c3c3c;
    margin-bottom: 10px;
  }

  button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #ff0000;
    }
  }
`;

export default Checkout;
