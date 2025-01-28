import { createSlice } from "@reduxjs/toolkit"

const applicationSlice = createSlice ({
    name: "applicationSlice",
    initialState:{
        loading: false,
        applicants:[],

    },
    reducers:{
     setApplicants: (state, action)=>{
            state.applicants = action.payload

        }

    }
})


export default applicationSlice.reducer
export const {setApplicants} = applicationSlice.actions

