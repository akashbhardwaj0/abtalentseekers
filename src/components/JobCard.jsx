import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

function JobCard(props) {
  const {job} = props;
  const navigate = useNavigate();



  const daysAgoFunction = (jobCreatedTime)=>{
    const createdAt = new Date(jobCreatedTime);
    const now = new Date();
    const jobDiffrence = now - createdAt
    return Math.floor(jobDiffrence / (1000 * 60 * 60 * 24));


  }

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition bg-white">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today": `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Avatar>
          <AvatarImage 
            src={job?.company?.logo}
            alt="Company Logo"
          />
        </Avatar>
        <div>
          <h1 className="text-sm font-bold text-gray-800">{job?.company.name}</h1>
          <p className="text-xs text-gray-600">Location: {job?.location}</p>
          <p className="text-xs text-gray-500">Position: {job?.position}</p>
        </div>
      </div>
      <h2 className="text-sm font-semibold text-gray-800">{job?.title}</h2>
      <p className="text-gray-700 text-xs mb-2">{job?.description}
      </p>
      <div className="flex flex-wrap gap-1 mb-2">
        <Badge variant="ghost" className="text-blue-600">{job?.position}</Badge>
        <Badge variant="ghost" className="text-red-600">{job?.jobType}</Badge>
        <Badge variant="ghost" className="text-purple-600">{job?.salary}</Badge>
      </div>
      <div className="flex justify-between gap-2">
        <Button variant="ghost" className="w-20%" onClick = {()=>{
          navigate(`/description/:${job._id}`)
        }}>Details</Button>
        <Button variant="ghost" className="w-20% bg-blueColor text-white">Save For Later</Button>
      </div>
    </div>
  );
}

export default JobCard;
