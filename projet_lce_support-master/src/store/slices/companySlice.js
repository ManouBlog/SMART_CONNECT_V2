import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../config/apiconfig'
import { toggleIsSpinner } from "./isLoadingSlice";
import { showMessage } from "./showErrorSlice";

/* ------------------ ASYNC ACTIONS ------------------ */

// GET all company
export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (_, { rejectWithValue ,dispatch}) => {
    
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.get("/companies");
       //console.log("fetchCompany_DATA",JSON.stringify(response,null,2))
      return response.data;
    } catch (error) {
        //console.log("fetchCompanyERROR",JSON.stringify(error,null))
         dispatch(showMessage({
        severity: 'error',
        duration: 5000,
        message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
      }));
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const addCompany = createAsyncThunk(
  "company/addCompany",
  async (formuleData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post(`/onboarding/company`, formuleData);
      
      return response.data;
    } catch (error) {
        //console.log("addCompany",JSON.stringify(error,null))
         dispatch(showMessage({
        severity: 'error',
        duration: 5000,
        message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
      }));
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (idData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.delete("/companies/"+ idData);
      return response.data;
    } catch (error) {
        //console.log("deleteCompany",JSON.stringify(error,null))
         dispatch(showMessage({
        severity: 'error',
        duration: 5000,
        message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
      }));
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// 🔹 UPDATE ROLE
export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("updateCompany",payload)
    dispatch(toggleIsSpinner(true));
    try {
     const response = payload.method !== 'put' ? await axios.post("/updatcompanies/" + payload.id,payload.dataForUpdate):await axios.put("/companies/" + payload.id,payload.dataForUpdate);
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
  "company/approvedPerson",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("toggleIsSpinner", toggleIsSpinner);
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
  "company/disapprovedPerson",
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

export const renouvelerContrat = createAsyncThunk(
  "company/renouvelerContrat",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("disapprovedPerson",payload)
    dispatch(toggleIsSpinner(true));
    try {
     const response = await axios.post(`/products/${payload.idProduct}/subscribe`,payload.data);
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

const companySlice = createSlice({
  name: "Company",
  initialState: {
    company: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompany.fulfilled, (state,action) => {
        state.loading = false;
        state.company = action.payload.data
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addCompany.fulfilled, (state, action) => {
        state.company.push(action.payload);
      })

      //UPDATE
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updateCompany.fulfilled, (state, action) => {
    //     state.loading = false;

    //     const index = state.company.findIndex(
    //       (company) => company.id === action.payload.id
    //     );

    //     if (index !== -1) {
    //       state.company[index] = action.payload;
    //     }
    //   });
  },
});

export default companySlice.reducer;
