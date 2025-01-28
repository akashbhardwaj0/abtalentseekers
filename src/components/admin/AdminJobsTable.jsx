import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function AdminJobsTable() {  
  const navigate = useNavigate();
  const{allAdminJobs, searchJobByText} = useSelector((state)=>state.jobs)
  const[filteredJob, setFilteredJob] = useState(allAdminJobs)

  useEffect(() => {
    setFilteredJob(
      allAdminJobs.filter((item) =>
        item.title.toLowerCase().includes(searchJobByText.toLowerCase())
      )
    );
  }, [searchJobByText, allAdminJobs]);

  return (
 
    <div>
      <Table>
        <TableCaption>A list of your resent posted jobs</TableCaption>
        <TableHeader>

          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            filteredJob.length<0?<span>No Job Available</span>:
            filteredJob?.map((item)=>(
      
              <TableRow key = {item._id}>
            <TableCell>{item.company?.name}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.createdAt.split("T")[0]}</TableCell>
            <TableCell className="text-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent clasName="w-32">
                  <div onClick={ ()=> navigate(`/admin/companies/${item._id}`)} className="flex item-center gap-2 w-fit cursor-pointer">
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                  <div onClick={ ()=> navigate(`/admin/jobs/${item._id}/applicants`)} className="flex item-center gap-2 w-fit cursor-pointer">
                    <Edit2 className="w-4" />
                    <span>Applicants</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
            ))
          }
          
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
