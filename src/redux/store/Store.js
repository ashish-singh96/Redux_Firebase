import { configureStore, combineReducers} from "@reduxjs/toolkit";
import userSlice from "../reducers/userReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key : 'root',
    version: 1, 
    storage
};

const reducer = combineReducers({
    auth: userSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,    
});
export default store;   