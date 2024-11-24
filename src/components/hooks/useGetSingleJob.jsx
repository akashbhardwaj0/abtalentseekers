import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice';

function useGetSingleJob(id) {
    const dispatch = useDispatch();
    useEffect(()=>{
        const apiUrl = `${JOB_API_END_POINT}/get/${id}`
        const fetchSingleJob = async ()=>{
  try {
    const response = await fetch(apiUrl, {
        methos: "GET",
        Credential: "include",
    })
    if(response.ok){
        const responseData = await response.json();
        dispatch(setSingleJob(responseData.job))
       

  
    }
    
  } catch (error) {
    console.log(error)
    
  }

  fetchSingleJob()

        }



    }, [])
  return (
    <div>

    </div>
  )
}

export default useGetSingleJob