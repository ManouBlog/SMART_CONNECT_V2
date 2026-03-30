import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../config/apiconfig'
import { toggleIsSpinner } from "./isLoadingSlice";
import  {showMessage} from './showErrorSlice'

/* ------------------ ASYNC ACTIONS ------------------ */

// GET all timeTreatment
export const fetchTimeTreatment = createAsyncThunk(
  "timeTreatment/fetchTimeTreatment",
  async (_, { rejectWithValue ,dispatch}) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.get("/plans-sla");
       //console.log("fetchTimeTreatment_DATA",JSON.stringify(response,null,2))
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                    severity: 'error',
                    duration: 5000,
                    message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                  }));
        //console.log("fetchTimeTreatmentERROR",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const addTimeTreatment = createAsyncThunk(
  "timeTreatment/addTimeTreatment",
  async (formuleData, { rejectWithValue,dispatch }) => {
    //console.log("addTimeTreatment",formuleData)
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post(`/plans/${formuleData.plan_id}/sla`, formuleData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("addTimeTreatment",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const deleteTimeTreament = createAsyncThunk(
  "timeTreatment/deleteTimeTreament",
  async (idData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    //console.log("idData",idData)
    try {
      const response = await axios.delete(`/plans/${idData.plan_id}/sla/`+ idData.severity_id);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("addTimeTreatment",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// 🔹 UPDATE ROLE
export const updateTimeTreatment = createAsyncThunk(
  "timeTreatment/updateTimeTreatment",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("updateTimeTreatment",payload)
    dispatch(toggleIsSpinner(true));
    try {
     const response = await axios.put("/plans/{plan}/sla/" + payload.id,payload.dataForUpdate);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
      return rejectWithValue(error.response?.data || "Erreur update");
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

/* ------------------ SLICE ------------------ */

const timeTreatmentSlice = createSlice({
  name: "TimeTreatment",
  initialState: {
    timeTreatment: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTimeTreatment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTimeTreatment.fulfilled, (state,action) => {
        state.loading = false;
        state.timeTreatment = action.payload.data
      })
      .addCase(fetchTimeTreatment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addTimeTreatment.fulfilled, (state, action) => {
        state.timeTreatment.push(action.payload);
      })

      //UPDATE
      .addCase(updateTimeTreatment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updateTimeTreatment.fulfilled, (state, action) => {
    //     state.loading = false;

    //     const index = state.roles.findIndex(
    //       (role) => role.id === action.payload.id
    //     );

    //     if (index !== -1) {
    //       state.roles[index] = action.payload;
    //     }
    //   });
  },
});

export default timeTreatmentSlice.reducer;
