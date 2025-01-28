import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "./utils/constant";
import { toast } from "sonner";
import { setLoading, setUser } from "@/redux/authSlice";

function UpdateProfileDialog(props) {
  const { open, setOpen } = props;
  const { loading, user } = useSelector((state) => state.auth);

  const [inputData, setInputData] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    skills: user?.profile?.skills || [],
    bio: user?.profile?.bio,
    file: user?.profile?.resume,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target; // Destructure name and value from event target
    setInputData({ ...inputData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file from the input
    setInputData({ ...inputData, file }); // Update state with the selected file
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", inputData.fullname);
    formData.append("email", inputData.email);
    formData.append("phoneNumber", inputData.phoneNumber);
    formData.append("skills", inputData.skills);
    formData.append("bio", inputData.bio);
    if (inputData.file) {
      formData.append("file", inputData.file);
    }

    const userApiUrl = `${USER_API_END_POINT}/profile/update`;
    try {
      const response = await fetch(userApiUrl, {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
   
        toast.success(responseData.message);
        dispatch(setUser(responseData.user.user));
        setOpen(false); // Close dialog on success
      } else {
        toast.error(responseData.error || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating profile");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={handleChange}
                  type="text"
                  value={inputData.fullname}
                  name="fullname"
                  id="name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleChange}
                  value={inputData.email}
                  name="email"
                  id="email"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlFor="number">Number</Label>
                <Input
                  onChange={handleChange}
                  value={inputData.phoneNumber}
                  name="phoneNumber"
                  id="number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  onChange={handleChange}
                  value={inputData.bio}
                  name="bio"
                  id="bio"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  onChange={handleChange}
                  value={inputData.skills}
                  name="skills"
                  id="skills"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 item-center gap-4">
                <Label htmlFor="file">Resume</Label>
                <Input
                  onChange={handleFileChange}
                  type="file"
                  accept="application/pdf"
                  name="file"
                  id="file"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4 ">
                  <Loader2 className="m-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button className="w-full">Update</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
