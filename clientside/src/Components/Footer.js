import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faFacebook,
    faTwitter,
    faInstagram,
    faYoutube
  } from "@fortawesome/free-brands-svg-icons";

const Footer=()=>{
    return (
        <div className="social-container">
        <h3>Social Follow</h3>
        <a href="https://www.linkedin.com/in/rohit-singh-039b0922b/"
          className="linkedin social">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="https://m.facebook.com/profile.php?eav=AfYAT-jj5XmXXkUlNtRYN0iJO6rfHjWVyXxOPxszD1ny7CWXMxhKphDibA5OyBkU-uU&paipv=0"
        className="facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href="https://twitter.com/_rohit_si" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href="https://www.instagram.com/rohitsi___/"
        className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
  </div>
    )
}
export default Footer;