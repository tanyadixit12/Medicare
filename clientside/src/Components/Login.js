import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import GoogleSignup from './GoogleSignup';
function Login() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');//to check wether the user is already signedup or not 
    //while loading the page
    if (auth) {
      navigate('/')
    }
  }, []);

  const handlelogin = async () => {
    console.warn(name, email, password);
    let result = await fetch("http://localhost:5800/login", {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.warn(result);
    if (result.verify) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.verify));
      navigate('/');
    }
    else {
      alert("not valid");
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
                    Login
                  </h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="Name">

                        <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >

                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="button" onClick={handlelogin}>
                          Login
                        </Button>

                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account??{' '}
                        <a href="/signup" className="text-primary fw-bold">
                          Create New account
                        </a>
                      </p>
                      <a href="/forget-link" className="text-primary fw-bold">
                        Forget Password
                      </a>
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

export default Login;