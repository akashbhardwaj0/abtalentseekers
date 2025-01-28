import React, { useEffect } from "react";
import { ADMIN_JOB_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllAdminJobs, setAllJob } from "@/redux/jobSlice";

function useGetAllAdminJob() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const apiUrl = `${ADMIN_JOB_END_POINT}/getadminjobs`;
        const response = await fetch(apiUrl, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const responseData = await response.json();

          dispatch(setAllAdminJobs(responseData.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, []);
}

export default useGetAllAdminJob;
