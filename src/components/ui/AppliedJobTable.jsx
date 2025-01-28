import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table'
import { useSelector } from 'react-redux'
import { Badge } from './badge'

function AppliedJobTable() {

  const {allAppliedJobs} = useSelector((state)=>state.jobs)
  return (
    <div>
      <Table>
  <TableCaption>A list of your recent applied jobs.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Date</TableHead>
      <TableHead>Job Role</TableHead>
      <TableHead>Company</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
      {
       allAppliedJobs?.application?.map((item)=>
        <TableRow key = {item?._id}>
       <TableCell className="font-medium">{item?.createdAt.split("T")[0]}</TableCell>
       <TableCell>{item?.job?.title}</TableCell>
       <TableCell>{item?.job?.company?.name}</TableCell>
       <TableCell className="text-right"><Badge className={`${item?.status === "rejected" ? 'bg-red-400' : item.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{item.status.toUpperCase()}</Badge></TableCell>
     </TableRow>

      
      ) 
        
      }
     
  </TableBody>
</Table>

    </div>
  )
}

export default AppliedJobTable