export const Login = (state, action) => {
    state.isAuthenticated = true;
    state.userData = action.payload;
}

export const Logout = (state, action) => {
    state.isAuthenticated = false;
    state.userData = null;
}

export const Register = (state, action) => {
    console.log(action.payload);
}