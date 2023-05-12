import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";


export const getItemsAsync = createAsyncThunk(
    'items/getItemsAsync', async()=>{
        const response = await fetch("https://run.mocky.io/v3/58770279-0738-4578-a1cf-c56a193fce98");
        if (response.ok){
            const items = await response.json();
            return { items };
        }
    }
)

export const itemSlice = createSlice({
    name: "items", 
    initialState: [],
    extraReducers:{
        [getItemsAsync.fulfilled]: (state,action)=>{
            return action.payload.items;
        },
    }
});

export default itemSlice.reducer;
