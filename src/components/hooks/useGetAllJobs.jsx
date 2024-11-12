import React, { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllJob } from "@/redux/jobSlice";

function useGetAllJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const apiUrl = `${JOB_API_END_POINT}/get`;
        const response = await fetch(apiUrl, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const responseData = await response.json();

          dispatch(setAllJob(responseData.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, []);
}

export default useGetAllJobs;
