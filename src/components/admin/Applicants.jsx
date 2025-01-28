import React, { useEffect, useState } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ADMIN_APPLICATION_API_END_POINT } from '../utils/constant'
import { setApplicants } from '@/redux/applicationSlice'
import { useDispatch, useSelector } from 'react-redux'

const Applicants = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const {applicants} = useSelector((state)=>state.application)

    useEffect(() => {
        const fetchApplicantsData = async () => {
            try {
                setLoading(true);
                const apiUrl = `${ADMIN_APPLICATION_API_END_POINT}/${id}/applicants`    
                const response = await fetch(apiUrl, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                if (response.ok) {
                    const responseData = await response.json();
                    dispatch(setApplicants(responseData.job))
                } else {
                    toast.error("Error while fetching Applicants Data");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchApplicantsData(); 
    }, []);    

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>        
            </div>
            <ApplicantsTable/>
        </div>
    )
}

export default Applicants