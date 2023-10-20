import React, { useState } from "react";
import Reusable from "../components/Reusable";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picMessage, setPicMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postDetails = (pics) => {
    if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
      setPicMessage("Please Select an Image");
    } else {
      setPicMessage(null);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "notezipper");
        data.append("cloud_name", "dsfr7nm3a");
        fetch("https://api.cloudinary.com/v1_1/dsfr7nm3a/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPicture(data.url.toString());
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setPicMessage("Please Select an Image");
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      toast.error("Passwords Don't Match");
    } else {
      try {
        setLoading(true);
        const requestBody = {
          name,
          email,
          password,
          picture,
        };
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        };

        const response = await fetch("http://localhost:5000/api/users", requestOptions);
        const data = await response.json();
        console.log('registered data',data);
        setLoading(false);

        if (response.status === 201) {
          localStorage.setItem("userInfo", JSON.stringify(data));
          // Redirect or perform other actions for successful registration
          toast.success("Registered Successfully");
          navigate("/login");
        } else if (response.status === 400) {
          toast.error(data.message); // Display the error message
        } else {
          toast.error("An error occurred while creating the user.");
        }
      } catch (error) {
        toast.error("An error occurred while creating the user.");
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Reusable title={"Register"}>
        <Form onSubmit={submitHandler} encType="multipart/form-data">
          {loading && <Loading />}

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Your Picture</Form.Label>
            <Form.Control type="file" onChange={(e) => postDetails(e.target.files[0])} />
          </Form.Group>
          {picMessage && <p className="text-danger">{picMessage}</p>}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <ToastContainer position="top-center" autoClose={1000} />
      </Reusable>
    </>
  );
};

export default RegisterPage;
