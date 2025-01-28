import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";
import { ADMIN_JOB_END_POINT } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function PostJob() {
    const navigate = useNavigate()
  const { allCompany } = useSelector((state) => state.company);
  const companies = allCompany?.companies;
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const[loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handleSelectChnage = (value) => {
    const selectedCompany = companies.find(
      (item) => item.name.toLowerCase() === value.toLowerCase()
    );
    if (selectedCompany) {
        setInputData({ ...inputData, companyId: selectedCompany._id });
      }
  };



  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
        setLoading(true)
        const apiUrl = `${ADMIN_JOB_END_POINT}/post`        
        const response = await fetch(apiUrl, {
            method: "POST",
            credentials:"include",   
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputData)
        })
        if(response.ok){
            const responseData = await response.json()
            navigate("/admin/jobs")
            toast.success(responseData.message || "Job Posted Successfully")
        }else {
            const errorData = await response.json()
            console.log("Failed to post job.", errorData.message);
            toast.error(errorData.message || "Failed to Post Job")
          }
        } catch (error) {
          console.log("Error:", error);
          toast.error("An error occurred while posting the job.");
        }
        finally{
            setLoading(false)
        }

    console.log("Injob data", inputData)



 }

  return (
    <div>
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={handleSubmit}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={inputData.title}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={inputData.description}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={inputData.requirements}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={inputData.salary}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={inputData.location}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={inputData.jobType}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={inputData.experience}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Postion</Label>
              <Input
                type="number"
                name="position"
                value={inputData.position}
                onChange={handleChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={handleSelectChnage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostJob;


