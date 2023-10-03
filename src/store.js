import {configureStore, createSlice} from "@reduxjs/toolkit"
const languageSlice = createSlice({
    name:"language",
    initialState:{value:"english",value2:"light"},
    reducers:{
        change:(state,action)=>{state.value = action.payload},
        changeColor:(state,action)=>{state.value2 = action.payload}
    }
})
export const {change,changeColor} = languageSlice.actions
export const store = configureStore({
    reducer:{
        language:languageSlice.reducer

    }
})