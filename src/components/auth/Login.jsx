import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `${USER_API_END_POINT}/login`;

    try {
      dispatch(setLoading(true));
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(inputData),
      }).then(async (response) => {
        if (response.ok) {
          const errorResponse = await response.json();
          toast.success(errorResponse.message || "Login Successfull");
          localStorage.setItem("auth-token", response.token);
          navigate("/");
        } else {
          const errorResponse = await response.json();
          toast.error(errorResponse.message || "An error occurred");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        className="w-full sm:w-1/2 border border-gray-200 rounded-md p-4 my-5 bg-white shadow-md"
        onSubmit={handleSubmit}
      >
      
        <h1 className="text-2xl font-bold mb-3">Login</h1>

        <div className="text-red-500 mb-2"></div>

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
            onChange={handleChange}
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
        </div>

        <div className="flex flex-col w-full">
          {loading ? (
            <Button className="w-full my-4 ">
              <Loader2 className="m-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button className="w-full">Login</Button>
          )}

          <Label className="mt-4">
            Do not have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-gray-600">
              <span className="ml-1">Sign up</span>
            </Link>
          </Label>
        </div>
      </form>
    </div>
  );
};

export default Login;
