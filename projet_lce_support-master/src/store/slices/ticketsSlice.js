import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../config/apiconfig'
import { toggleIsSpinner } from "./isLoadingSlice";
import { showMessage } from "./showErrorSlice";

/* ------------------ ASYNC ACTIONS ------------------ */

// GET all tickets
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (_, { rejectWithValue ,dispatch}) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.get("/tickets");
       //console.log("fetchTickets_DATA",JSON.stringify(response,null,2))
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("fetchTicketsERROR",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

export const fetchOneTicket = createAsyncThunk(
  "tickets/fetchOneTicket",
  async (payload, { rejectWithValue ,dispatch}) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.get("/tickets/" + payload);
       //console.log("fetchOneTicket",JSON.stringify(response,null,2))
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("fetchOneTicket",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);

export const ticketSeen = createAsyncThunk(
  "tickets/ticketSeen",
  async (payload, { rejectWithValue,dispatch}) => {
    // dispatch(toggleIsSpinner(true));
    try {
       const response = await axios.post(`tickets/${payload}/flag`,{flag:1});
       //console.log("ticketSeen",response)
       dispatch(fetchTickets()); 
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("fetchOneTicket",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(fetchTickets()); 
    }
  }
);

// POST new role
export const addTickets = createAsyncThunk(
  "tickets/addTickets",
  async (formuleData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post(`/tickets`, formuleData);
      
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("addTickets",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);


export const rejectedTickets = createAsyncThunk(
  "tickets/rejectTickets",
  async (payload, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.post(`/super-admin/tickets/${payload.ticketId}/review`, payload.data);
      
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("rejectTickets",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);


// POST new role
export const deleteTickets = createAsyncThunk(
  "tickets/deleteTickets",
  async (idData, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
      const response = await axios.delete("/tickets/"+ idData);
      return response.data;
    } catch (error) {
      dispatch(showMessage({
                          severity: 'error',
                          duration: 5000,
                          message: JSON.stringify(error.message) || JSON.stringify(error.response.data.message)
                        }));
        //console.log("deleteTickets",JSON.stringify(error,null))
      return rejectWithValue(error.response.data);
    }finally{
        dispatch(toggleIsSpinner(false));
    }
  }
);



// 🔹 UPDATE ROLE
export const updateTickets = createAsyncThunk(
  "tickets/updateTickets",
  async (payload, { rejectWithValue,dispatch }) => {
    //console.log("updateTickets",payload)
    dispatch(toggleIsSpinner(true));
    try {
const statusRoutes = {
  in_progress: "/start",
  resolved: "/resolve",
  closed: "/close",
  Echanged:'/messages',
  customer_confirmation:'/customer-action',
  customer_rejected:'/customer-action'
};
const routeChooseByStatus = statusRoutes[payload.status] ?? "/close";
     const response =await axios.post("/tickets/" + payload.id_ticket+routeChooseByStatus,payload.data);
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
  "tickets/approvedPerson",
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

export const assignerPerson = createAsyncThunk(
  "tickets/assignerPerson",
  async (payload, { rejectWithValue,dispatch }) => {
    dispatch(toggleIsSpinner(true));
    try {
     const response = await axios.post("/tickets/"+payload.ticketId+"/assign",payload.data);
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
  "tickets/disapprovedPerson",
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

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    loading: false,
    error: null,
    messages:[],
    ticket:null,
    badgeTicket:0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state,action) => {
        state.loading = false;
        state.tickets = action.payload.data
      const elements = action.payload.data.filter(item => item.flag == 0)
        state.badgeTicket = elements.length
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchOneTicket.fulfilled, (state,action) => {
        state.loading = false;
        state.ticket = action.payload.data
        //console.log("fetchOneTicket.fulfilled",action.payload)
        state.messages = action.payload.data.messages
      })
      .addCase(ticketSeen.fulfilled,(state)=>{
        state.badgeTicket--
      })
      // ADD
      .addCase(addTickets.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      })

      //UPDATE
      .addCase(updateTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updateTickets.fulfilled, (state, action) => {
    //     state.loading = false;

    //     const index = state.tickets.findIndex(
    //       (tickets) => tickets.id === action.payload.id
    //     );

    //     if (index !== -1) {
    //       state.tickets[index] = action.payload;
    //     }
    //   });
  },
});

export default ticketsSlice.reducer;
