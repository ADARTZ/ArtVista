import axios from "../axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useStateValue } from "../StateProvider";

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .post("/orders/get", { email: user.email })
      .then((res) => setOrders(res.data));
  }, []);
  console.log(orders);

  return (
    <Container>

      <Main>
        <OrderContainer>
          <h2>Your Orders</h2>

          {orders.map((order) => (
            <OrderDetail>
              <AddressComponent>
                <h4>Shipping Address</h4>

                <div>
                  <p>{order.address.fullName}</p>
                  <p>{order.address.flat}</p>
                  <p>{order.address.area}</p>

                  <p>
                    {order.address.city} {order.address.state}
                  </p>
                  <p>Phone : {order.address.phone}</p>
                </div>
              </AddressComponent>
              <OrderBasket>
                <h4>Order</h4>
                <p>
                  Subtotal : ₹ <span>{order.price}</span>
                </p>

                {order.products.map((product) => (
                  <Product>
                    <Image>
                      <img src={product.image} alt="" />
                    </Image>
                    <Description>
                      <h4>{product.title}</h4>

                      <p>₹ {product.price}</p>
                    </Description>
                  </Product>
                ))}
              </OrderBasket>
            </OrderDetail>
          ))}
        </OrderContainer>
      </Main>
    </Container>
  );
}

const OrderContainer = styled.div`
  padding: 15px;
  background-color: rgb(0,0,0,0.2);
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: rgba(0,0,0,0.7) url('../levi.jpeg');
  background-size: cover;
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-attachment: fixed;


  h2 {
    font-weight: 600;
    font-size: 28px;
    color: yellow;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
  }
  
`;


const OrderDetail = styled.div`
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
  font-size: 1.5rem;
`;


const AddressComponent = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: rgb(254,254,254,0.5);
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  div {
    margin-top: 10px;
    margin-left: 10px;

    p {
      font-size: 1.2rem;
      margin-top: 2px;
      font-weight: bold;
    }
  }
`;

const OrderBasket = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: rgb(254,254,254,0.5);
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  p {
    font-size: 1.3rem;
    font-weight: bold;
    margin-left: 5px;
    margin-top: 1px;

    span {
      font-weight: bold;
    }
  }
`;


const Image = styled.div`
  flex: 0.3;
  img {
    margin-top: 15px;
    width: 80%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Description = styled.div`
  flex: 0.5;
  margin-left: 20px;
  h4 {
    font-weight: bold;
    font-size: 2.5rem;

    @media only screen and (max-width: 1200px) {
      font-size: 14px;
    }
  }

  p {
    font-weight: bold;
    margin-top: 10px;
    font-size: 1.8rem;
  }

  button {
    background-color: transparent;
    color: #1384b4;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  // max-width: 1400px;

  margin: auto;
  background-color: rgb(234, 237, 237);
`;

const Main = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;



const Product = styled.div`
  display: flex;
  align-items: center;
`;


export default Orders;
