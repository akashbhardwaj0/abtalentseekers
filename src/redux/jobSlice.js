import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    loading: false,
    allJobs: [],
    singleJob: null,
  },
  reducers: {
    setAllJob:(state, action)=>{
        state.allJobs = action.payload;
    },
    setSingleJob:(state, action)=>{
      state.singleJob = action.payload;

  }


  },
});

export const {setAllJob, setSingleJob} = jobSlice.actions;
export default jobSlice.reducer;
