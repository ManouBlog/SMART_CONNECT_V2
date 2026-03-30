import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isSpinner: false
}

const isLoadingReducer = createSlice({
  name: "isLoading",
  initialState,
  reducers: {
    toggleIsSpinner: (state, action) => {
      state.isSpinner = action.payload
    },
  },
})

export const { toggleIsSpinner } = isLoadingReducer.actions
export default isLoadingReducer.reducer
