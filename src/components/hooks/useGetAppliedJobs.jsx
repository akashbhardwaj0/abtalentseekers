import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { APPLIED_JOB_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAppliedJobs } from '@/redux/jobSlice';

function useGetAppliedJobs() {
    const dispatch = useDispatch();

    useEffect(()=>{

        const appliedJobData = async()=>{
    
          try {
            const apiUrl = `${APPLIED_JOB_END_POINT}`
        const response = await fetch(apiUrl,{
          method:"GET",
          credentials:"include",
          headers:{
            "Content-Type": "application/json"
          }
        })
        if(response.ok){
          const responseData = await response.json()
          dispatch(setAllAppliedJobs(responseData))
        }
        
      } catch (error) {
        console.log(error)
        toast.error("Ann error occured while fatching data", error)
        
      }
    
        }
        appliedJobData()
    
    
      },[])


  
}

export default useGetAppliedJobs