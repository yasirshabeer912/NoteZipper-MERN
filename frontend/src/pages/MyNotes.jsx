import React, { useEffect, useState } from "react";
import Reusable from "../components/Reusable";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
// import notes from "../data";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyNotes = () => {
  const [notes,setNotes] = useState([])
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  console.log('User',userInfo);

const fetchNotes = async () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo || !userInfo.token) {
    // If there's no user info or token in localStorage, navigate to the login page.
    navigate('/login');
    return;
  }



  try {
    const response = await axios.get('http://localhost:5000/api/notes', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    const { data } = response;
    console.log('Fetched data:', data);
    setNotes(data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  fetchNotes();
}, []);
  return (
    <Reusable title={`Welcom To Note Zipper Mr: ${userInfo.name}`}>
      <Link to="/create">
        <Button className=" mb-3">Create New Note</Button>
      </Link>

      {notes.map((note) => (
        <Accordion key={note._id}>
          <Accordion.Item eventKey="0">
            <Card key={note._id}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  // onClick={() => ModelShow(note)}
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                    
                  }}
                >
                  <Accordion.Header
                  
                    style={{ textDecoration: "none", border: "none",marginBottom:'15px' }}
                  >
                    {note.title}
                  </Accordion.Header>
                </span>
                <Button
                style={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
                }}
                 href={`/note/${note._id}`}>
                Edit
                </Button>
                <Button
                  onClick={() => deleteHandler(note._id)}
                  variant="danger"
                  className="mx-2"
                  style={{color:'white',backgroundColor:'red'}}
                >
                  Delete
                </Button>
              </Card.Header>
              <Accordion.Body>
                <Card.Body>
                  <h4>
                    <Badge variant="success" className="bg-success text-light">
                      Category - {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">Created on </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </Reusable>
  );
};

export default MyNotes;
