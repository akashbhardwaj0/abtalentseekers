import { setSingleCompany } from "@/redux/companySlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "../utils/constant";

function useGetCompanyById(companyId) {
  const dispatch = useDispatch();
  const fetchSingleCompany = async () => {
    const url = `${COMPANY_API_END_POINT}/get/${companyId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message || "Data fatched successfully");
        dispatch(setSingleCompany(responseData.company));
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching company data.");
    }
  };

  useEffect(() => {
    fetchSingleCompany();
  }, [companyId, dispatch]);
}

export default useGetCompanyById;
