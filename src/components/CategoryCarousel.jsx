import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setSearchQuery } from "@/redux/jobSlice";

function CategoryCarousel() {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Fullstack Developer",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJobSearch = (query)=>{
  
      dispatch(setSearchQuery(query))
      navigate("/browse")
  
    }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg-basis1/3">
              <Button onClick = {()=>handleJobSearch(item)} variant="outline" className="rounded-full">
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
