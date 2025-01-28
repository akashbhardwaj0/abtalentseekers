import React, { useEffect, useState } from "react";
import FilterCard from "../FilterCard";
import JobCard from "../JobCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";



const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((state) => state.jobs);
  const[filteredJobs, setFilteredJobs] = useState(allJobs)


  useEffect(() => {
    if (searchQuery) {
      const lowerSearchQuery = searchQuery.toLowerCase();
      const searchWords = lowerSearchQuery.split(/\s+/); // Split by spaces into words
      
      const filterJob = allJobs.filter((item) => {
        const lowerLocation = item.location.toLowerCase();
        return (
          searchWords.some(word => lowerLocation.includes(word)) || 
          item.title.toLowerCase().includes(lowerSearchQuery) ||
          item.description.toLowerCase().includes(lowerSearchQuery)
        );
      });
      setFilteredJobs(filterJob);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchQuery]);
  
  

  

  // useGetAllJobs()
  return (
    <div>
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>

          {filteredJobs.length ? (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filteredJobs.map((item) => (
                  <motion.div 
                  initial={{opacity:0, x:100}}
                  animate = {{opacity:1, x:0}}
                  exit={{opacity:0, x:-100}}
                  transition={{duration:0.3}}

                  key = {item._id}>
                    <JobCard job = {item} jobId = {123456789} />
                  </motion.div>
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
