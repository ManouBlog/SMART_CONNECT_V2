import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../config/apiconfig'
import { toggleIsSpinner } from "./isLoadingSlice";
import { showMessage } from "./showErrorSlice";

/* ------------------ ASYNC ACTIONS ------------------ */

// GET all Products
export const fetchProduct = createAsyncThunk(
  "Products/fetchProduct",
  async (_, { rejectWithValue ,dispatch}) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.get("/products");
       //console.log("fetchProduct_DATA",JSON.stringify(response,null,2))
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("fetchProductERROR",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const addProducts = createAsyncThunk(
  "Products/addProducts",
  async (formuleData, { rejectWithValue,dispatch }) => {
    //console.log("addProducts",formuleData)
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post("/products", formuleData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("addProducts",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// POST new role
export const deleteProducts = createAsyncThunk(
  "Products/deleteProducts",
  async (idData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.delete("/products/"+ idData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("deleteProducts",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

// 🔹 UPDATE ROLE
export const updateProducts = createAsyncThunk(
  "Products/updateProducts",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("updateProducts",payload)
    dispatch(toggleIsSpinner(true));
    try {
     const response = await axios.put("/products/" + payload.id,payload.dataForUpdate);
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

const ProductSlice = createSlice({
  name: "Products",
  initialState: {
    Products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state,action) => {
        state.loading = false;
        state.Products = action.payload.data
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addProducts.fulfilled, (state, action) => {
        state.Products.push(action.payload);
      })

      //UPDATE
      .addCase(updateProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updateProducts.fulfilled, (state, action) => {
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

export default ProductSlice.reducer;
