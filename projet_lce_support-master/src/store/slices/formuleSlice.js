import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../config/apiconfig'
import { toggleIsSpinner } from "./isLoadingSlice";
import { showMessage } from "./showErrorSlice";

/* ------------------ ASYNC ACTIONS ------------------ */

// GET all Formules
export const fetchFormules = createAsyncThunk(
  "Formules/fetchFormules",
  async (_, { rejectWithValue ,dispatch}) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.get("/plans");
       //console.log("fetchFormules_DATA",JSON.stringify(response,null,2))
      return response.data;
    } catch (error) {
      dispatch(showMessage({
              severity: 'error',
              duration: 5000,
              message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
            }));
        //console.log("fetchFormulesERROR",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const addFormule = createAsyncThunk(
  "Formules/addFormule",
  async (formuleData, { rejectWithValue,dispatch }) => {
    //console.log("addFormule",formuleData)
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post("/plans", formuleData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                    severity: 'error',
                    duration: 5000,
                    message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                  }));
        //console.log("addFormule",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const deleteFormule = createAsyncThunk(
  "Formules/deleteFormule",
  async (idData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.delete("/plans/"+ idData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                    severity: 'error',
                    duration: 5000,
                    message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                  }));
        //console.log("addFormule",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// 🔹 UPDATE ROLE
export const updateFormule = createAsyncThunk(
  "Formules/updateFormule",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("updateFormule",payload)
    dispatch(toggleIsSpinner(true));
    try {
     const response = await axios.put("/plans/" + payload.id,payload.dataForUpdate);
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

const formuleSlice = createSlice({
  name: "Formule",
  initialState: {
    Formules: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchFormules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFormules.fulfilled, (state,action) => {
        state.loading = false;
        state.Formules = action.payload.data
      })
      .addCase(fetchFormules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addFormule.fulfilled, (state, action) => {
        state.Formules.push(action.payload);
      })

      //UPDATE
      .addCase(updateFormule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updateFormule.fulfilled, (state, action) => {
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

export default formuleSlice.reducer;
