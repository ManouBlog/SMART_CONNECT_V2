import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../config/apiconfig'
import { toggleIsSpinner } from "./isLoadingSlice";
import  {showMessage} from './showErrorSlice'

/* ------------------ ASYNC ACTIONS ------------------ */

// GET all agentsupport
export const fetchagentSupport = createAsyncThunk(
  "agentsupport/fetchagentSupport",
  async (_, { rejectWithValue ,dispatch}) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.get("/users/supports");
       //console.log("fetchagentSupport_DATA",JSON.stringify(response,null,2))
      return response.data;
    } catch (error) {
       dispatch(showMessage({
              severity: 'error',
              duration: 5000,
              message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
            }));
        //console.log("fetchagentSupportERROR",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const addagentSupport = createAsyncThunk(
  "agentsupport/addagentSupport",
  async (formuleData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post(`/users`, formuleData);
      
      return response.data;
    } catch (error) {
       dispatch(showMessage({
              severity: 'error',
              duration: 5000,
              message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
            }));
        //console.log("addagentSupport",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const deleteagentsupport = createAsyncThunk(
  "agentsupport/deleteagentsupport",
  async (idData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.delete("/users/"+ idData);
      return response.data;
    } catch (error) {
       dispatch(showMessage({
              severity: 'error',
              duration: 5000,
              message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
            }));
        //console.log("deleteagentsupport",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// 🔹 UPDATE ROLE
export const updateagentsupport = createAsyncThunk(
  "agentsupport/updateagentsupport",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("updateagentsupport",payload)
    dispatch(toggleIsSpinner(true));
    try {
     const response = await axios.put("/users/" + payload.id,payload.dataForUpdate);
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


// export const approvedPerson = createAsyncThunk(
//   "agentsupport/approvedPerson",
//   async (payload, { rejectWithValue,dispatch }) => {
//     dispatch(toggleIsSpinner(true));
//     try {
//      const response = await axios.post("/pending-users/approve-multiple/",payload);
//       return  response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Erreur update");
//     }finally{
//         dispatch(toggleIsSpinner(false));
//     }
//   }
// );

// export const disapprovedPerson = createAsyncThunk(
//   "agentsupport/disapprovedPerson",
//   async (payload, { rejectWithValue,dispatch }) => {
//     //console.log("disapprovedPerson",payload)
//     dispatch(toggleIsSpinner(true));
//     try {
//      const response = await axios.put("/pending-users/reject-multiple/" + payload);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Erreur update");
//     }finally{
//         dispatch(toggleIsSpinner(false));
//     }
//   }
// );

/* ------------------ SLICE ------------------ */

const agentSlice = createSlice({
  name: "agentsupport",
  initialState: {
    agentsupport: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchagentSupport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchagentSupport.fulfilled, (state,action) => {
        state.loading = false;
        state.agentsupport = action.payload.data
      })
      .addCase(fetchagentSupport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addagentSupport.fulfilled, (state, action) => {
        state.agentsupport.push(action.payload);
      })

      //UPDATE
      .addCase(updateagentsupport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updateagentsupport.fulfilled, (state, action) => {
    //     state.loading = false;

    //     const index = state.agentsupport.findIndex(
    //       (agentsupport) => agentsupport.id === action.payload.id
    //     );

    //     if (index !== -1) {
    //       state.agentsupport[index] = action.payload;
    //     }
    //   });
  },
});

export default agentSlice.reducer;
