import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../hooks/useGetCompanyById";

function CompanySetup() {
  const { id } = useParams();
  useGetCompanyById(id)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((state) => state.company);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInputData({ ...inputData, file });
  };

  useEffect(() => {
    if (singleCompany) {
      setInputData({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Inpiut Data", inputData);
    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("description", inputData.description);
    formData.append("website", inputData.website);
    formData.append("location", inputData.location);

    if (inputData.file) {
      formData.append("file", inputData.file);
    }

    try {
      const apiUrl = `${COMPANY_API_END_POINT}/update/${id}`;

      const response = await fetch(
      apiUrl,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        navigate("/admin/companies");
        console.log(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.result.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex item-center gap-5 p-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex item-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <spam>Back</spam>
          </Button>
          <h1 className="font-bold text-xl"> CompanySetup</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={inputData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={inputData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={inputData.website}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={inputData.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Logo</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        {loading ? (
          <Button className="w-full my-4 ">
            <Loader2 className="m-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full mt-8">
            Update
          </Button>
        )}

        {/* <Button type="submit" className="w-full mt-8">Update</Button> */}
      </form>
    </div>
  );
}

export default CompanySetup;
