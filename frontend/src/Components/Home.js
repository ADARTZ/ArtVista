
import axios from "../axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce"; 
import "./home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("/products/get");
    const filteredProducts = response?.data?.filter(
      (product) => product.rating >= 4
    );
    setProducts(filteredProducts);
    const fuse = new Fuse(filteredProducts, {
      keys: ["title"], 
    });

    const results = fuse.search(searchQuery);
    const filteredResults = searchQuery ? results.map(result => result.item) : filteredProducts;
    setFilteredProducts(filteredResults);
  };

  const debouncedFetchData = debounce(fetchData, 300);

  useEffect(() => {
    debouncedFetchData();
  }, [searchQuery]);

  return (
    <Container>
      <div className="box-main">
        <div className="firsthalf">
          <p className="text-big">AD ARTZ</p>
          <p className="text-small">"To be an artist is to believe in life"</p>
          <div className="buttons">
            <a href="https://instagram.com/shallow_attraction?igshid=MzMyNGUyNmU2YQ==">
              <button className="btn">Follow</button>
            </a>
            <a href="https://wa.me/919136009648">
              <button className="btn">Connect</button>
            </a>
          </div>
        </div>

        <div className="secondhalf">
          <img src="d.jpg" alt="art logo" />
        </div>

        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <HeadingContainer>
        <HeadingTitle>"Artistic Impressions"</HeadingTitle>
        <ShopNowButton to="/products">Shop Now</ShopNowButton>
      </HeadingContainer>

      <Main>
        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            id={product._id}
            image={product.imageURL}
            price={product.price}
            rating={product.rating}
            title={product.title}
          />
        ))}
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  height: 100%;
  padding: 2rem;
  overflow-x: hidden;

  background: rgba(0, 0, 0, 0.7) url('../levi.jpeg');
  background-size: cover;
  background-blend-mode: darken;
  background-attachment: scroll;
  background-repeat: repeat-y;
`;

const Banner = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
`;

const BannerSlider = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  animation: slide 15s linear infinite;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes slide {
    0% {
      transform: translateX(0%);
    }
    20% {
      transform: translateX(0%);
    }
    25% {
      transform: translateX(-100%);
    }
    45% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(-200%);
    }
    70% {
      transform: translateX(-200%);
    }
    75% {
      transform: translateX(-300%);
    }
    95% {
      transform: translateX(-300%);
    }
    100% {
      transform: translateX(-400%);
    }
  }
`;

const Main = styled.div`
  display: grid;
  width: 97%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const HeadingTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: white;
  margin-top: 00.100rem;
`;

const ShopNowButton = styled(Link)`
  background-color: black;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`;



export default Home;











