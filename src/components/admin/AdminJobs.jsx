import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchJobByTextL } from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJob from "../hooks/useGetAllAdminJob";


function AdminJobs() {
    useGetAllAdminJob()
  const[inputValue, setInputValue] = useState("")
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSearchJobByTextL(inputValue))
  }, [inputValue, dispatch])
  useGetAllCompanies();
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex item-center justify-between my-5">
        <Input className="w-fit" placeholder="Filter by name" onChange={(e) => setInputValue(e.target.value)} />
        <Button onClick={() => navigate("/admin/jobs/create")}>
          New Job
        </Button>
      </div>
<AdminJobsTable/>
    </div>
  );
}

export default AdminJobs;
