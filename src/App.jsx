import React from "react";
import Navbar from "./components/shared/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/pages/Home";
import Jobs from "./components/pages/Jobs";
import Browse from "./components/pages/Browse";
import Profile from "./components/auth/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/profile" element = {<Profile/>}/>
        <Route path = "/jobs" element = {<Jobs/>}/>
        <Route path = "description/:id" element = {<JobDescription/>}/>
        <Route path = "/browse" element = {<Browse/>}/>

        {/* Admin Section */}

        <Route path="/admin/companies" element = {<Companies/>}/>
        <Route path="/admin/companies/create" element = {<CompanyCreate/>}/>
        <Route path="/admin/companies/:id" element = {<CompanySetup/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
