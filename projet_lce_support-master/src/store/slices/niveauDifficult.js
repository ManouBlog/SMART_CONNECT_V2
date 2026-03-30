import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../config/apiconfig'
import { toggleIsSpinner } from "./isLoadingSlice";
import { showMessage } from "./showErrorSlice";

/* ------------------ ASYNC ACTIONS ------------------ */

// GET all niveauDifficulte
export const fetchNiveauDifficult = createAsyncThunk(
  "niveauDifficulte/fetchNiveauDifficult",
  async (_, { rejectWithValue ,dispatch}) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.get("/severities");
       //console.log("fetchNiveauDifficult_DATA",JSON.stringify(response,null,2))
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("fetchNiveauDifficultERROR",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const addNiveauDifficult = createAsyncThunk(
  "niveauDifficulte/addNiveauDifficult",
  async (roleData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post("/severities", roleData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                    severity: 'error',
                    duration: 5000,
                    message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                  }));
        //console.log("addNiveauDifficult",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const deleteNiveauDifficult = createAsyncThunk(
  "niveauDifficulte/deleteNiveauDifficult",
  async (idData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.delete("/severities/"+ idData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("addNiveauDifficult",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// 🔹 UPDATE ROLE
export const updateNiveauDifficult = createAsyncThunk(
  "niveauDifficulte/updateNiveauDifficult",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("updateNiveauDifficult",payload)
    dispatch(toggleIsSpinner(true));
    const data={
        label:payload.dataForUpdate
    }
    try {
     const response = await axios.put("/severities/" + payload.id,data);
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

const niveauDifficultSlice = createSlice({
  name: "niveauDifficult",
  initialState: {
    niveauDifficulte: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchNiveauDifficult.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNiveauDifficult.fulfilled, (state,action) => {
        state.loading = false;
        state.niveauDifficulte = action.payload.data
      })
      .addCase(fetchNiveauDifficult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addNiveauDifficult.fulfilled, (state, action) => {
        state.niveauDifficulte.push(action.payload);
      })

      //UPDATE
      .addCase(updateNiveauDifficult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updateNiveauDifficult.fulfilled, (state, action) => {
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

export default niveauDifficultSlice.reducer;
