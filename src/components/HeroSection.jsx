import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

function HeroSection() {
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
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <div className="flex rounded-full w-[40%] shadow-lg border border-grayColor-200 pl-3 rounder-full item-center gap-4 mx-auto">
        <Input type = "text" placeholder = "Find your Dream Job" className="rounded-full outline-none border-none w-full"/>
        <Button className = "rounded-r-full bg-blueColor"><Search className="bg-gray"/></Button>
      </div></div>
    </div>
  );
}

export default HeroSection;
