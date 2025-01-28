import React, { Suspense } from "react";
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
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
// import Test from "./components/Test";

// const Test = React.lazy(() => import("./components/Test"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="description/:id" element={<JobDescription />} />
          <Route path="/browse" element={<Browse />} />

          {/* Admin Section */}

          <Route path="/admin/companies" element={ <ProtectedRoute><Companies /></ProtectedRoute>} />
          <Route path="/admin/companies/create" element={<ProtectedRoute> <CompanyCreate /> </ProtectedRoute>} />
          <Route path="/admin/companies/:id" element={<ProtectedRoute> <CompanySetup /> </ProtectedRoute>} />

          {/* Admin Job */}

          <Route path="/admin/jobs" element={ <ProtectedRoute> <AdminJobs /> </ProtectedRoute>} />
          <Route path="/admin/jobs/create" element={<ProtectedRoute> <PostJob /> </ProtectedRoute>} />
          <Route path = "/admin/jobs/:id/applicants" element = {<ProtectedRoute><Applicants /> </ProtectedRoute>}/>



        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
