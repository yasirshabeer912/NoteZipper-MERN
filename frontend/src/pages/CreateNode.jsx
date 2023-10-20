import React, { useState } from "react";
import Reusable from "../components/Reusable";
import { Button, Card, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../components/Loading";
import axios from "axios";
import { useUser } from "../context";
const CreateNode = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState("");
  // Try to get the user information from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Check if the user information exists and contains a token
  const token = userInfo ? userInfo.token : null;

  console.log(token);

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    // Check if the email and password fields are empty
    if (!title || !category || !content) {
      toast.error("Please fill in All Fields");
      return;
    }
  
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, category }),
      };
  
      setLoading(true);
  
      const response = await fetch("http://localhost:5000/api/notes/create", requestOptions);
      const data = await response.json();
      // Handle the response data as needed
      console.log(data);
      // Reset the form fields
      resetHandler();
  
      // Display a success message
      toast.success('Note created successfully');
  
      setLoading(false);
    } catch (error) {
      console.log("Note Error", error);
    }
  };
  

  return (
    <Reusable title="Create a Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
        <ToastContainer position="top-center" autoClose={1000} />
      </Card>
    </Reusable>
  );
};

export default CreateNode;
