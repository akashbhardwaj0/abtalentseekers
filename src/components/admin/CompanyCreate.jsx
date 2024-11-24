import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CompanyCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({CompanyName:""})

  const handleChange = (e) =>{
    const {name, value} = e.target
    setInputData({...inputData, [name]:value})
  }

  const handleContinue = async (e) => {
    e.preventDefault();
    const companyName = {"companyName": inputData.CompanyName}


    try {
        const companyApiUrl = `${COMPANY_API_END_POINT}/register`
        const response = await fetch(companyApiUrl, {
            method: "POST",
            credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(companyName)
        })
        if(response.ok){
            const responseData = await response.json();
            const companyID = responseData?.company?._id
            navigate(`/admin/companies/${companyID}`)
            dispatch(setSingleCompany(responseData.company))
            toast.success(responseData.message || "Company Registered Successfully");
        }
        else{
            const responseData = await response.json();
            toast.success(responseData.message || "Company Registration Failed");

        }

    } catch (error) {
        console.log("ERROR", error)
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-10">
        <h1 className="font-bold text-2xl">Your Company Name</h1>
        <p className="text-gray-500">
          What would you like to give your company name? You can change it later
        </p>
      </div>
      <Label>Company Name</Label>
      <Input
        type="text"
        className="my-2"
        placeholder="Google, Microsoft etc."
        onChange={handleChange}
        value={inputData.CompanyName}
        name = "CompanyName"
      />
      <div className="flex item-center gap-2 my-10">
        <Button variant="outline" onClick={() => navigate("/admin/companies")}>
          Cancel
        </Button>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
}

export default CompanyCreate;
