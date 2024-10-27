import { configureStore } from "@reduxjs/toolkit";
import authAndProfileReducer from "./slices/authAndProfile";
import productInCartSlice from "./slices/productInCartSlice";
import productSlice from "./slices/productSlice";
import createSagaMiddleware from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import { doProfileRegisterSaga, PROFILE_REGISTER } from "./slices/saga/authAndProfileSaga";
import { doProfileUpdateSaga, PROFILE_UPDATE } from "./slices/saga/profileUpdateSaga";
import { getProductSaga, PRODUCT_GET } from "./slices/saga/getProductSaga";

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
    yield takeEvery(PROFILE_REGISTER, doProfileRegisterSaga);
    yield takeEvery(PROFILE_UPDATE, doProfileUpdateSaga);
    yield takeEvery(PRODUCT_GET, getProductSaga);
}

const store = configureStore({
    reducer: {
        authAndProfile: authAndProfileReducer,
        productSlice: productSlice,
        productInCartSlice: productInCartSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(sagas);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

