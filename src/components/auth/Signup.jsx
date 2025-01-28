import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "../utils/constant";

function Signup() {
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleFileChange = (e) => {
    setInputData({ ...inputData, file: e.target.files?.[0] }); // Corrected line
  };
  const handleSubmit = async (e) => {
    e.preventDefault();    
    const formData = new FormData();
    formData.append("fullname", inputData.fullname);
    formData.append("email", inputData.email);
    formData.append("phoneNumber", inputData.phoneNumber);
    formData.append("password", inputData.password);
    formData.append("role", inputData.role);
    
    // Check if a file is provided and append it to the FormData
    if (inputData.file) {
      formData.append("file", inputData.file);
    }
  
    try {
      dispatch(setLoading(true));
      const userApiUrl = `${USER_API_END_POINT}/register`;
      const response = await fetch(userApiUrl, {
        method: "POST",
        body: formData, 
        credentials: "include", 
      });
  
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message || "Registration successful!");
        navigate("/login");
      } else {
        const responseData = await response.json();
        toast.error(responseData.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(()=>{
      if(user){
          navigate("/");
      }
  },[])
  
  

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        className="w-full sm:w-1/2 border border-gray-200 rounded-md p-4 my-5 bg-white shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-3">Sign Up</h1>

        <div className="mb-3">
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullname"
            value={inputData.fullname}
            placeholder="Enter your full name"
            className="mt-1 border border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={inputData.email}
            placeholder="Enter your email address"
            className="mt-1 border border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <Label>Phone</Label>
          <Input
            type="tel"
            name="phoneNumber"
            value={inputData.phoneNumber}
            placeholder="Enter your phone number"
            className="mt-1 border border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={inputData.password}
            placeholder="Create a password"
            className="mt-1 border border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            onChange={handleChange}
          />
        </div>

        <div className="flex my-3 justify-between items-center">
          <RadioGroup
            value={inputData.role}
            onChange={handleChange} // Corrected line
            className="flex gap-2"
          >
            <div className="flex items-center gap-1">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={inputData.role === "student"}
                onChange={handleChange}
              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center gap-1">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={inputData.role === "recruiter"}
                onChange={handleChange}
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </RadioGroup>

          <div className="flex gap-2 items-center">
            <Label>Profile</Label>
            <Input
              type="file"
              accept="image/*"
              name="profile"
              className="mt-1 border border-gray-300 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          {loading ? (
            <Button className="w-full my-4 ">
              <Loader2 className="m-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button className="w-full">Sign up</Button>
          )}
          <Label className="mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 hover:text-gray-600">
              <span className="ml-1">Login</span>
            </Link>
          </Label>
        </div>
      </form>
    </div>
  );
}

export default Signup;
