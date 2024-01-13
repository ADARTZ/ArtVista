import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import AdminPanel from "./AdminPanel/AdminPanel";


function Navbar(props) {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const { isAuthenticated } = props;
  let isadmin;
  
  console.log(localStorage.getItem("user"));
  // if (localStorage.getItem("user")){
  //   console.log("loop executed")
  //   const abc= JSON.parse(localStorage.getItem("user"))
  //    isadmin = abc["isAdmin"]
  //   console.log(isadmin)
  // }
  // else{
  //   console.log("loop not executed")
  // }



  if (localStorage.getItem("user")) {
    console.log("loop executed");
    const abc = JSON.parse(localStorage.getItem("user"));
    isadmin = "true";
//     // console.log(isadmin);
//     console.log("isAuthenticated:", isAuthenticated);
// console.log("isadmin:", isadmin);
  } else {
    console.log("loop not executed");
  }
  // const abc= JSON.parse(localStorage.getItem("user"))
  // const isadmin = abc["isAdmin"]
  // console.log(isAdmin)
  const signOut = () => {
    dispatch({
      type: "SET_USER",
      user: null,
    });

    localStorage.removeItem("user");
    navigate("/");
  };




  const SearchBar = () => {
    const navigate = useNavigate();

    const handleSearch = (event) => {
      event.preventDefault();
      const query = event.target.elements.search.value.trim();

      if (query) {
        // navigate(`/search?q=${query}`);
      }
    };

    // return (

    //   <form onSubmit={handleSearch}>
    //     <input type="text" placeholder="Search art..." name="search" />
    //     {/* <button type="submit"> */}
    //       <SearchIcon >
    //         {/* <img src="./searchIcon.png" alt="Search"/> */}
    //       </SearchIcon >
    //     {/* </button> */}
    //   </form>
    // );
    
  };


  return (
    <Container>
      <Inner>
        <Logo onClick={() => navigate("/")}>
          <img src="./img.jpg" alt="logo" />
        </Logo>
        <NavLinks>
          <NavLink onClick={() => navigate("/products")}>Products</NavLink>
          <NavLink onClick={() => navigate("/about-us")}>About Us</NavLink>
          <NavLink onClick={() => navigate("/Order form")}>Order Form</NavLink>
          {/* <NavLink onClick={() => navigate("/addproduct")}>Add Product</NavLink> */}
          { isadmin && <NavLink onClick={() => navigate("/addproduct")}>Add Product</NavLink>} 
        </NavLinks>

        <RightContainer>

          <SearchBar />


          <NavButton

            onClick={user ? () => signOut() : () => navigate("/login")}
          >
            {user ? (




              <UserContainer>
                {/* <UserAvatar src={"./photoURL"} alt="user-avatar" /> */}
                <UserName>{user?.fullName}</UserName>
              </UserContainer>
            ) : (
              <SignUpButton>Sign Up</SignUpButton>
            )}
          </NavButton>
          <NavButton onClick={() => navigate("/orders")}>
            {/* <NavButton> */}
            <div>
              <p>Return</p>
              <p>& Orders</p>
            </div>
          </NavButton>

          <BasketButton onClick={() => navigate("/checkout")}>
            <img src="./cart1.svg" alt="" />
            <p>{basket?.length}</p>
          </BasketButton>
        </RightContainer>
        {/* {isAuthenticated && isadmin && <AdminPanel />} */}
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80px;
  color: #131921;
  display: flex;
  align-items: center;
  position: sticky;
  font-size: 18px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
 
  background: rgba(0,0,0,0.7) url('../levi.jpeg');
  background-size: cover;
  background-blend-mode: darken;
  background-attachment: scroll;
  background-repeat: repeat-y;


  @media only screen and (max-width: 767px) {
    height: auto;
    padding: 10px;
  }
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
 


  img {
    border-radius: 50px;
    border: 3px solid white;
    width: 50px;
    height : 50px;
  }

  @media only screen and (max-width: 767px) {
    margin-bottom: 10px;

    img {
      width: 120px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;

  @media only screen and (max-width: 767px) {
    margin: 0;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
  }
`;

const NavLink = styled.div`
  cursor: pointer;
  font-size: 20px;
  margin-left: 30px;
  transition: color 0.3s ease-in-out;
  color : white;
  &:hover {
    color: #a8a8a8;
  }

  @media only screen and (max-width: 767px) {
    margin: 10px 0;
    font-size: 16px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  

  @media only screen and (max-width: 767px) {
    margin: 20px 0;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  align:center;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-right: 10px;
  padding: 5px;
`;

const NavButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: white;
  padding : 5px;

  &:hover {
    color: #FF4500;
  }

  div{
    margin-left:10px;
    margin-right:10px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding :5 px;
`;

const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius:
`;
const UserName = styled.div`
  font-size: 18px;
  margin-left: 10px;
  padding :5px 5px;
`;

const SignUpButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  padding: 10px 10px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-left: 10px;
  border: 2px solid white;
  margin-bottom:20px:

  &:hover {
    background-color: red;
    color: gray;
  }
`;


const BasketButton = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  cursor: pointer;

 

  img {
    width: 30px;
    margin-right: 10px;
    color:red;
    &:hover {
      filter: brightness(50%);  

    }
    }
    
  p {
    margin-right:10px;
    color: white;
    font-weight: 500;
    &:hover {
      filter: brightness(50%);  

    }
  }

  &:hover{
    color: black ;
  }
`;

const SearchIcon = styled.div`
  cursor: pointer;
  margin-left: 1px;
  margin-right:0px;
  
  img {
    width: 20px;
    height: 17px;
  }
`;


export default Navbar;














































