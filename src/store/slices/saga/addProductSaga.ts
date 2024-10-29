import { call, put } from "redux-saga/effects";
import { isTErrorResponse, TServerError } from "../../../shared/fetchHelpers/typeGuards";
import { createAction } from "@reduxjs/toolkit";
import { UNKNOWN_ERROR_MESSAGE } from "./constant";
import { Category, Product, TAddProductParams, TUpdateProductParams } from "../../../entities/ViewProductList/model/types/types";
import { addProductApi, putProductApi } from "../../../entities/ViewProductList/api/request";
import { setError, cleanProductList } from "../productSlice";
import { productGet } from "./getProductSaga";

// Saga Effects. Add product
export function* addProductSaga(data: { type: string, payload: TAddProductParams }): any {
    try {
        yield addProductApi(data.payload);
        yield put(cleanProductList())
        yield call(productGet, { pageSize: 10, pageNumber: 1, sorting: { type: 'ASC', field: 'id' } });
    } catch (error: unknown) {
        if (isTErrorResponse(error)) {
            let allErrors = "";
            error.response.data.errors.forEach((e: TServerError) => allErrors += e.message);

            yield put(setError({ isError: true, errorMessage: allErrors }))
        } else {
            yield put(setError({ isError: true, errorMessage: UNKNOWN_ERROR_MESSAGE }))
        }
    }
}

export const PRODUCT_ADD = 'product/addProduct';
export const productAdd = createAction<TAddProductParams>(PRODUCT_ADD);