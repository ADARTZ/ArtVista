import React from "react";
import styled from "styled-components";

function AboutUs() {
  return (
    <Container>
      <Banner>
        {/* <h1>About Us</h1> */}
      </Banner>
      <Content>
        <h2>Our Story</h2>
        <p>
        "Welcome to AD-ARTZ artistic world! I'm a passionate sketch and manga artist, and this website is my canvas for sharing my creative journey with you.I strive to capture emotions and stories through my art. Each piece is a unique expression of my vision and a reflection of the beauty I find in the world. Thank you for joining me on this artistic adventure. Explore my gallery, and I hope you find a piece that speaks to you."

Feel free to personalize it further to match your unique style and artistic vision. </p>
        <p></p>
        <h2>Our Team</h2>
        <Team>
          <TeamMember>
          
          </TeamMember>
          <TeamMember>
            <img src="/ad.jpg" alt="Team Member 1" />
            <h3>Adarsh Yadav</h3>
            {/* <p>CEO</p> */}
          </TeamMember>
          <TeamMember>
           
          </TeamMember>
          
        </Team>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  
background: rgba(0,0,0,0.7) url('../levi.jpeg');
background-size: cover;
background-blend-mode: darken;
background-repeat: no-repeat;
background-attachment: fixed;

`;

const Banner = styled.div`
max-width: 1300px;
  margin: 0 auto;
  padding: 50px 25px;
  height: 400px;
  background-image: url('/ADBanner.jpg');
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

//   h1 {
//     font-size: 48px;
//     text-align: center;
//   }
`;

const Content = styled.div`
max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
  margin-top: 50px;
  font-size: 18px;
  line-height: 1.5;
color : white;
  h2 {
    font-size: 32px;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
  }
`;

const Team = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
`;

const TeamMember = styled.div`
  flex-basis: calc(33.33% - 20px);
  margin-bottom: 20px;
  text-align: center;

  img {
    border-radius: 50%;
    max-width: 200px;
    max-height: 100px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
    ;
}

p {
font-size: 18px;
line-height: 1.5;
}
`;

export default AboutUs;