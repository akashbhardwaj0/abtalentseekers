import React from "react";
import JobCard from "../JobCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";

function Browse() {
  useGetAllJobs()

  const {allJobs} = useSelector((state)=>state.jobs)

  return (
    <div>
              <div className="max-w-7xl mx-auto my-10">
        
      <h1 className="font-bold text-lg my-10">Search Results {allJobs.length}</h1>
      <div className="grid grid-cols-3 gap-4">

     
      {
        allJobs.map((item)=>{
            return(
                <JobCard key = {item._id} job = {item}/>
            )
        })
      }
       </div>
    </div></div>
  );
}

export default Browse;
