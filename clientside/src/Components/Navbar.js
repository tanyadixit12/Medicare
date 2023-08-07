import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

     

const Navigation=()=>{

  const auth = localStorage.getItem('user');
 
  
const navigate=useNavigate();
  const logout=()=>{ //to logout and clear data from localstorage
    localStorage.clear();
    navigate('/login'); //alternate way to redirect on sign up page
}

  return(
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">Brain-Boost</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          
          
         
            <Nav.Link href="/">Home</Nav.Link>
         
             {localStorage.getItem('user')&&(<><Nav.Link href={`/user/${JSON.parse(auth).name}`}>List</Nav.Link><Nav.Link href={`/profile/${JSON.parse(auth).name}`}>Profile</Nav.Link></>)}
          
          
         {localStorage.getItem('user')&& (<NavDropdown title="Problems" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/puzzels">Puzzels</NavDropdown.Item> <NavDropdown.Item href={`/${"jee"}`}> JEE</NavDropdown.Item> <NavDropdown.Divider /> <NavDropdown.Item href="/computer">
                Computer </NavDropdown.Item>
          </NavDropdown>)}

         {localStorage.getItem('user')&&( <Nav.Link href="/login" onClick={logout}>Logout({JSON.parse(auth).name})</Nav.Link>)}
        </Nav>
        <Nav>
         {!localStorage.getItem('user')&&( <><Nav.Link href="/login">Login</Nav.Link><Nav.Link eventKey={2} href="/signup">
              Signup
            </Nav.Link></>)}
            {localStorage.getItem('user')&&( <Nav.Link href="/add-problem">Add Problems</Nav.Link>)}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    
);
}
export default Navigation;