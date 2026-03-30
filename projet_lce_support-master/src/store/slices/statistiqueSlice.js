import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../config/apiconfig'
import { toggleIsSpinner } from "./isLoadingSlice";
import { showMessage } from "./showErrorSlice";

/* ------------------ ASYNC ACTIONS ------------------ */

// GET all statistiques
export const fetchStatistique = createAsyncThunk(
  "statistiques/fetchStatistique",
  async (payload, { rejectWithValue ,dispatch}) => {
    dispatch(toggleIsSpinner(true));
    try {

      const routeLaunch = payload.userRoleId === 1 ? '/super-admin/stats/global-distribution':'/admin/company-stats/graph';  

      //console.log("payload.dataSend",payload)
      const response = await axios.post(routeLaunch,payload.dataSend);
       //console.log("fetchStatistique_DATA",JSON.stringify(response,null,2))
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("fetchStatistiqueERROR",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// globalNbreStatistiques
export const globalNbreStatistiques = createAsyncThunk(
  "statistiques/globalNbreStatistiques",
  async (payload,{rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    const routeLaunch = payload.userRoleId === 1 ? '/super-admin/global':'/admin/company-stats'; 
    try {
      const response = await axios.get(routeLaunch);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("globalNbreStatistiques",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const deletestatistiques = createAsyncThunk(
  "statistiques/deletestatistiques",
  async (idData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.delete("/statistiques/"+ idData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("deletestatistiques",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// 🔹 UPDATE ROLE
export const updatestatistiques = createAsyncThunk(
  "statistiques/updatestatistiques",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("updatestatistiques",payload)
    dispatch(toggleIsSpinner(true));
    try {
const statusRoutes = {
  in_progress: "/start",
  resolved: "/resolve",
  paused: "/suspend",
  closed: "/close",
  resume:'/resume'
};
const routeChooseByStatus = statusRoutes[payload.status] ?? "/close";
     const response =await axios.post("/statistiques/" + payload.id+routeChooseByStatus,{comment:payload.commentaire});
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


export const approvedPerson = createAsyncThunk(
  "statistiques/approvedPerson",
  async (payload, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
     const response = await axios.post("/pending-users/approve-multiple",payload);
      return  response.data;
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

export const disapprovedPerson = createAsyncThunk(
  "statistiques/disapprovedPerson",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("disapprovedPerson",payload)
    dispatch(toggleIsSpinner(true));
    try {
     const response = await axios.put("/pending-users/reject-multiple/" + payload);
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

const statistiqueSlice = createSlice({
  name: "statistiques",
  initialState: {
    statistiques: [],
    statistiquesGlobal:null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchStatistique.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatistique.fulfilled, (state,action) => {
        state.loading = false;
        state.statistiques = action.payload.data
      })
      .addCase(fetchStatistique.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(globalNbreStatistiques.fulfilled, (state, action) => {
        state.statistiquesGlobal = action.payload;
      })

      //UPDATE
      .addCase(updatestatistiques.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updatestatistiques.fulfilled, (state, action) => {
    //     state.loading = false;

    //     const index = state.statistiques.findIndex(
    //       (statistiques) => statistiques.id === action.payload.id
    //     );

    //     if (index !== -1) {
    //       state.statistiques[index] = action.payload;
    //     }
    //   });
  },
});

export default statistiqueSlice.reducer;
