import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOutfit, IOutfitState } from "./outfit.interface";

export const initialOutfitState: IOutfitState = {
    outfits: []
}
const outfitSlice = createSlice({
    name: "outfits",
    initialState: initialOutfitState,
    reducers: ({
        listOutfitSlice: (state: IOutfitState, actions: PayloadAction<IOutfit[]>) => {
            state.outfits = actions.payload
        },
        deleteOutfitSlice: (state: IOutfitState, actions: PayloadAction<string>) => {
            state.outfits = state.outfits.filter((outfit) => outfit._id !== actions.payload)
        },
    })
})

export const { listOutfitSlice, deleteOutfitSlice } = outfitSlice.actions
export default outfitSlice.reducer