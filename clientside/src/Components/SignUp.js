import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import GoogleSignup from "./GoogleSignup";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const navigate=useNavigate(); 

    useEffect(() => {
      const auth = localStorage.getItem('user');//to check wether the user is already signedup or not 
      //while loading the page
      if (auth) {
          navigate('/')
      }
  }, [])

    const collectData=async()=>{
        
        console.warn(name,email,password);
        if(!name||!email||!password||!cpassword)
       {
        window.alert("please fill all fields ");
        
        return ;
       }
       if(password!==cpassword)
        {
          console.log("password does not match");
          return;
        }
        
        
        let result = await fetch("http://localhost:5800/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password,cpassword }),
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.success===false){
          alert("something is wrong");
          navigate('/login')
        }
        else{
          localStorage.setItem("user", JSON.stringify(result.result));
          localStorage.setItem("token", JSON.stringify(result.verify));
          navigate('/');
        }
        
       

    }

  return (
    <div>
      
    <Container>
      
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="px-4">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                
                <h2 className="fw-bold mb-2 text-center text-uppercase ">
                  SignUp
                </h2>
                <div className="mb-3">
                  <Form  >
                    <Form.Group className="mb-3" controlId="Name">
                     
                      <Form.Control type="text" placeholder="Enter Name"
                      value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                     
                      <Form.Control type="email" placeholder="Enter email" 
                      value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                     
                      <Form.Control type="password" placeholder="Password" 
                      value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="BasicPassword"
                    >
                      
                      <Form.Control type="password" placeholder="Confirm Password" 
                      value={cpassword} onChange={(e) => setCpassword(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid">
            
                      <Button variant="primary" type="button" onClick={collectData} >
                        Create Account
                      </Button>
                    </div>
                  </Form>
                  <GoogleSignup />
                  <div className="mt-3">
                    
                    <p className="mb-0  text-center">
                      Already have an account??{' '}
                      <a href="/login" className="text-primary fw-bold">
                        Sign In
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default Signup;