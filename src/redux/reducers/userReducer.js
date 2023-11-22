import { createSlice } from "@reduxjs/toolkit";
import { Login, Register, Logout } from "../actions/userActions";
const userSlice = createSlice({
    name: 'user',
    initialState :{
        isAuthenticated : false,
        userData : null
    },

    reducers :{
        login: (state,action)=> Login(state,action),
        logout: (state,action)=> Logout(state,action),
        register: (state,action)=> Register(state,action),
    }
});

export const {login, register, logout} = userSlice.actions;

export default userSlice.reducer;