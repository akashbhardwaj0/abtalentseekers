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
import useGetCompanyById from "../hooks/useGetCompanyById";


function CompaniesTable() {

  
  const navigate = useNavigate();
  const {allCompany, searchCompanyByText} = useSelector((state)=>state.company);
  const companies = allCompany?.companies; 
  const[filteredCompany, setFilteredCompany] = useState(companies)

  useEffect(() => {
    setFilteredCompany(
      companies.filter((item) =>
        item.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
      )
    );
  }, [searchCompanyByText, companies]);

  return (
 
    <div> 
      <Table>
        <TableCaption>A list of your resent registered companies</TableCaption>
        <TableHeader>

          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            filteredCompany.length<0?<span>No Company Available</span>:
            filteredCompany?.map((item)=>(
      
              <TableRow key = {item._id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={item.logo} />
              </Avatar>
            </TableCell>
            <TableCell>{item.name}</TableCell>
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

export default CompaniesTable;
