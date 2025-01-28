import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { ADMIN_APPLICATION_API_END_POINT, JOB_API_END_POINT } from "./utils/constant";
import { toast } from "sonner";

function JobDescription() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const jobId = id.startsWith(":") ? id.slice(1) : id;
  const { singleJob } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const applicationStatus = singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(applicationStatus);

  const handleJobApply = async () => {
    try {
      const response = await fetch(
        `${ADMIN_APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setIsApplied(true);

        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }],
        };

        dispatch(setSingleJob(updateSingleJob));
        toast.success(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const apiUrl = `${JOB_API_END_POINT}/get/${jobId}`;
    const fetchSingleJob = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const responseData = await response.json();
          dispatch(setSingleJob(responseData.job));
          setIsApplied(
            responseData.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchSingleJob();
  }, [id, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10" key={singleJob?._id}>
      <div className="flex item-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-600">
              {singleJob?.position} Positions
            </Badge>
            <Badge variant="ghost" className="text-red-600">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-purple-600">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button onClick={isApplied ? null : handleJobApply} disabled={isApplied} className={`rounded-lg ${
            isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]" }`}>
          {isApplied ? "Already Applied" : "Apply Now"}</Button>
      </div>
      <h1 className="border-b-2 border-b-grayColor-300 font-medium py-4">{singleJob?.description}</h1>
      <div className='my-4'>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
    </div>
  );
}

export default JobDescription;
