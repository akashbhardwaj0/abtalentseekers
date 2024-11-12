import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42k-1Lakh", "1Lakh-5Lakh"],
  },
];
function FilterCard() {
  return (
    <div className="w-full bg-white p-4 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((item, index) => (
          <div>
            <h1 className="font-bold text-lg">{item.filterType}</h1>
            {item.array.map((item, index) => {
              return (
                <div className="flex item-center space-x-2 my-2">
                  <RadioGroupItem value={item} key={index} />
                  <Label>{item}</Label>
                </div>
              );
            })}
            <hr className="mt-3" />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
