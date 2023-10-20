import React, { useState } from "react";
import Reusable from "../components/Reusable";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Loading from "../components/Loading";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../context";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser(); // Import the login function from the context

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if the email and password fields are empty
    if (!email || !password) {
      toast.error("Please fill in both email and password fields.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      setLoading(true);

      const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password }, config);

      setLoading(false);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Update the user state using the context login function
      login(data);
      
      navigate("/mynotes");
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  }

  return (
    <Reusable title={"LOGIN"}>
      <Form onSubmit={submitHandler}>
        {loading && <Loading />}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer position="top-center" autoClose={1000} />
    </Reusable>
  );
};

export default LoginPage;
