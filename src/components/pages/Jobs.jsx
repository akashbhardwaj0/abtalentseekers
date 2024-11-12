import React from "react";

import FilterCard from "../FilterCard";
import JobCard from "../JobCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";


const Jobs = () => {
  const { allJobs } = useSelector((state) => state.jobs);
  // console.log("Job page", allJobs)
  useGetAllJobs()
  return (
    <div>
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>

          {allJobs.length ? (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((item) => (
                  <div key = {item._id}>
                    <JobCard job = {item} jobId = {123456789} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            "Job Not Found"
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
