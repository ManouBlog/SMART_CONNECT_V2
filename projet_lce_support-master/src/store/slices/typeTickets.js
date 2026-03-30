import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../config/apiconfig'
import { toggleIsSpinner } from "./isLoadingSlice";
import { showMessage } from "./showErrorSlice";

/* ------------------ ASYNC ACTIONS ------------------ */

// GET all TypeTickets
export const fetchTypeTickets = createAsyncThunk(
  "TypeTickets/fetchTypeTickets",
  async (_, { rejectWithValue ,dispatch}) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.get("/ticket-types");
       //console.log("fetchTypeTickets_DATA",JSON.stringify(response,null,2))
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("fetchTypeTicketsERROR",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const addTypeTickets = createAsyncThunk(
  "TypeTickets/addTypeTickets",
  async (formuleData, { rejectWithValue,dispatch }) => {
    //console.log("addTypeTickets",formuleData)
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post("/ticket-types", formuleData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("addTypeTickets",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const deleteTypeTickets = createAsyncThunk(
  "TypeTickets/deleteTypeTickets",
  async (idData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.delete("/ticket-types/"+ idData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("deleteTypeTickets",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// 🔹 UPDATE ROLE
export const updateTypeTickets = createAsyncThunk(
  "TypeTickets/updateTypeTickets",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("updateTypeTickets",payload)
    dispatch(toggleIsSpinner(true));
    try {
     const response = await axios.put("/ticket-types/" + payload.id,payload.dataForUpdate);
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

const typeTicketsSlice = createSlice({
  name: "typeTickets",
  initialState: {
    typeTickets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTypeTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTypeTickets.fulfilled, (state,action) => {
        state.loading = false;
        state.typeTickets = action.payload.data
      })
      .addCase(fetchTypeTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addTypeTickets.fulfilled, (state, action) => {
        state.typeTickets.push(action.payload);
      })

      //UPDATE
      .addCase(updateTypeTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updateTypeTickets.fulfilled, (state, action) => {
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

export default typeTicketsSlice.reducer;
