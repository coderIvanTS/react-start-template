import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Sorting } from "../../entities/ViewProductList/model/types/types";

type TError = {
    isError: boolean;
    errorMessage: string;
}

type TLoad = {
    isLoading: boolean;
}

type TUpdate = {
    isUpdating: boolean;
}

type TPagination = {
    maxOnPage: number;
    sort: Sorting;
    currentPage: number;
}

export type TProductList = {
    productList: Product[];
    pagination: TPagination;
    loading: TLoad;
    updating: TUpdate;
    error: TError;
}

const initialState: TProductList = {
    productList: [],
    pagination: {
        maxOnPage: 10,
        sort: { type: 'ASC', field: 'id' },
        currentPage: 1,
    },
    loading: { isLoading: false },
    updating: { isUpdating: false },
    error: { isError: false, errorMessage: "" }
}

const productSlice = createSlice(
    {
        name: 'product',
        initialState,
        reducers: {
            addToProductList(state, action: PayloadAction<Product>) {
                state.productList.push(action.payload);
            },
            addProductsToList(state, action: PayloadAction<Product[]>) {
                state.productList.push(...action.payload);
            },
            cleanProductList(state) {
                state.productList = [];
            },
            setCurrentPage(state, action: PayloadAction<number>) {
                state.pagination.currentPage = action.payload;
            },
            setIsLoading(state, action: PayloadAction<boolean>) {
                state.loading.isLoading = action.payload;
            },
            setError(state, action: PayloadAction<TError>) {
                state.error.isError = action.payload.isError;
                state.error.errorMessage = action.payload.errorMessage;
            }
        }
    }
)

export default productSlice.reducer;

export const { addToProductList, addProductsToList, cleanProductList, setCurrentPage, setIsLoading, setError } = productSlice.actions;