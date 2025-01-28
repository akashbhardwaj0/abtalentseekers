import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import {setSearchQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [inputData, setInputData] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleJobSearch = ()=>{

    dispatch(setSearchQuery(inputData))
    navigate("/browse")

  }

  useEffect(()=>{
    dispatch(setSearchQuery(""))

  },[])

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-redColor font-medium">
          Connecting Ambition with Opportunity
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply <br /> Get Your{" "}
          <span className="text-blueColor">Dream Job</span>
        </h1>
        <p>Your Pathway to Professional Success</p>
        <div className="flex rounded-full w-[40%] shadow-lg border border-grayColor-200 pl-3 rounder-full item-center gap-4 mx-auto">
        <Input onChange = {(e)=>setInputData(e.target.value)} type = "text" placeholder = "Find your Dream Job" className="rounded-full outline-none border-none w-full"/>
        <Button onClick = {handleJobSearch} className = "rounded-r-full bg-blueColor"><Search className="bg-gray"/></Button>
      </div></div>
    </div>
  );
}

export default HeroSection;
