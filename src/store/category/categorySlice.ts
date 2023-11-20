import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ICategory, ICategoryState } from "./category.interface"

export const initialStateCategory: ICategoryState = {
    categories: []
}

const categorySlice = createSlice({
    name: "categories",
    initialState: initialStateCategory,
    reducers: ({
        listCategorySlice: (state: ICategoryState, actions: PayloadAction<ICategory[]>) => {
            state.categories = actions.payload.filter((cate) => cate.name !== "Chưa phân loại")
        },
        deleteCategorySlice: (state: ICategoryState, actions: PayloadAction<string>) => {
            state.categories = state.categories.filter((cate) => cate._id !== actions.payload)
        }
    })
})

export const { listCategorySlice, deleteCategorySlice } = categorySlice.actions
export default categorySlice.reducer

