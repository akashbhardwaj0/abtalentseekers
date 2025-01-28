import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    loading: false,
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: [],
    allAppliedJobs:[],
    searchQuery:""
  },
  reducers: {
    setAllJob: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByTextL: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs:(state, action)=>{
      state.allAppliedJobs = action.payload
    },
    setSearchQuery:(state, action)=>{
      state.searchQuery = action.payload

    }
  },
});

export const { setAllJob, setSingleJob, setAllAdminJobs, setSearchJobByTextL, setAllAppliedJobs, setSearchQuery } =
  jobSlice.actions;
export default jobSlice.reducer;
