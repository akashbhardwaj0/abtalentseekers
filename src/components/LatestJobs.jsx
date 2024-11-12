import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

function LatestJobs() {
  const { allJobs } = useSelector((state) => state.jobs);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold ">
        <span className="text-blueColor">Latest & Top</span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Jobs Available</span>
        ) : (
          allJobs.slice(0, 6).map((item) => <LatestJobCards key={item._id} job={item} />)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
