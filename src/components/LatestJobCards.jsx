import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom';

function LatestJobCards(props) {
  const{job} = props;
  const navigate = useNavigate();
  return (
    <div onClick = {()=> navigate(`/description/:${job?._id}`)} className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1">
        <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-grayColor'>{job?.location}</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job.title}</h1>
            <p className='text-sm text-grayColor'>{job.description}</p>
        </div>
        <div className='flex item-center gap-2 mt-4'>
            <Badge className={'text-blueColor font-bold'} variant = "ghost">{job.position}</Badge>
            <Badge className={'text-redColor font-bold'} variant = "ghost">{job.jobType}</Badge>
            <Badge className={'text-purpleColor font-bold'} variant = "ghost">{job.salary}</Badge>
        </div>
        </div>
  )
}
  
export default LatestJobCards