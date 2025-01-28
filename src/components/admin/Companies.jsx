import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";


function Companies() {
  useGetAllCompanies();
  const[inputValue, setInputValue] = useState("")
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSearchCompanyByText(inputValue))
  }, [inputValue, dispatch])

  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex item-center justify-between my-5">
        <Input className="w-fit" placeholder="Filter by name" onChange={(e) => setInputValue(e.target.value)} />
        <Button onClick={() => navigate("/admin/companies/create")}>
          New Company
        </Button>
      </div>
      <CompaniesTable/>
    </div>
  );
}

export default Companies;
