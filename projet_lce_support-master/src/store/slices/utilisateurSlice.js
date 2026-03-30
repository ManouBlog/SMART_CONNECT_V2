import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../config/apiconfig'
import { toggleIsSpinner } from "./isLoadingSlice";
import  {showMessage} from './showErrorSlice'

/* ------------------ ASYNC ACTIONS ------------------ */

// GET all utilisateurs
export const fetchUtilisateurs = createAsyncThunk(
  "utilisateurs/fetchUtilisateurs",
  async (_, { rejectWithValue ,dispatch}) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.get("/users/my-company-users");
       //console.log("fetchUtilisateurs_DATA",JSON.stringify(response.data,null,2))
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("fetchUtilisateursERROR",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const addUserWithFileExcel = createAsyncThunk(
  "utilisateurs/addUserWithFileExcel",
  async (formuleData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post(`/import-pending-users`, formuleData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("addUserWithFileExcel",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
      dispatch(fetchUtilisateurs())
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const addUtilisateur = createAsyncThunk(
  "utilisateurs/addUtilisateur",
  async (formuleData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post(`/pending-users`, formuleData);
      
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("addUtilisateur",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const deleteUtilisateur = createAsyncThunk(
  "utilisateurs/deleteUtilisateur",
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
        //console.log("deleteUtilisateur",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// 🔹 UPDATE ROLE
export const updateUtilisateurs = createAsyncThunk(
  "utilisateurs/updateUtilisateurs",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("updateUtilisateurs",payload)
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
//   "utilisateurs/approvedPerson",
//   async (payload, { rejectWithValue,dispatch }) => {
//     dispatch(toggleIsSpinner(true));
//     try {
//      const response = await axios.post("/pending-users/approve-multiple",payload);
//       return  response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Erreur update");
//     }finally{
//         dispatch(toggleIsSpinner(false));
//     }
//   }
// );

// export const disapprovedPerson = createAsyncThunk(
//   "utilisateurs/disapprovedPerson",
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

const utilisateursSlice = createSlice({
  name: "Utilisateurs",
  initialState: {
    utilisateurs: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchUtilisateurs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUtilisateurs.fulfilled, (state,action) => {
        state.loading = false;
        //console.log("action.payload.data",action.payload)
        state.utilisateurs = action.payload
      })
      .addCase(fetchUtilisateurs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      // .addCase(addUtilisateur.fulfilled, (state, action) => {
      //   state.utilisateurs = action.payload;
      // })

      //UPDATE
      .addCase(updateUtilisateurs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updateUtilisateurs.fulfilled, (state, action) => {
    //     state.loading = false;

    //     const index = state.utilisateurs.findIndex(
    //       (utilisateurs) => utilisateurs.id === action.payload.id
    //     );

    //     if (index !== -1) {
    //       state.utilisateurs[index] = action.payload;
    //     }
    //   });
  },
});

export default utilisateursSlice.reducer;
