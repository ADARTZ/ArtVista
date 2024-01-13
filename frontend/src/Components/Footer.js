import React from "react";
import styled from "styled-components";
import './footer.css'
import { useNavigate } from "react-router-dom";
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import CallIcon from '@material-ui/icons/Call';


const Footer = () => {

  const navigate = useNavigate();
  return (
    <div className='footer' >
    <p className="footer-title"> AD<span className="half">ARTZ</span></p>
    <div className="footer-social">
        <a href="https://wa.me/919136009648" className="footer-icon"><WhatsappIcon/></a>
        <a href="http://t.me/ADARTZ66" className="footer-icon"><TelegramIcon/></a>
        <a href="https://instagram.com/shallow_attraction?igshid=MzMyNGUyNmU2YQ==" className="footer-icon"><InstagramIcon/></a>
    </div>
    <p className='footer-copyright'><CallIcon/>   
     <span> +91 9136794866</span></p>
</div>
   
  );
};

export default Footer;
