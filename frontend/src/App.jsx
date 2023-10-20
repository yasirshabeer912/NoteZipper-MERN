import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNotes from "./pages/MyNotes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateNode from "./pages/CreateNode";
import EditNote from "./pages/EditNote";

const App = () => {
  return (
    <>
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/mynotes" element={<MyNotes/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/create" element={<CreateNode/>}/>
          <Route path="/note/:id" element={<EditNote/>}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
