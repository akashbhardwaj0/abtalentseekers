import { setAllCompany } from "@/redux/companySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "../utils/constant";

function useGetAllCompanies() {
  const dispatch = useDispatch();

  const fetchAllCompanies = async () => {
    const url = `${COMPANY_API_END_POINT}/get`
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.message(responseData.message);
        dispatch(setAllCompany(responseData));
      }
    } catch {
      console.log(console.error);
    }
  };

  useEffect(()=>{
    fetchAllCompanies();
  },[])

}

export default useGetAllCompanies;
