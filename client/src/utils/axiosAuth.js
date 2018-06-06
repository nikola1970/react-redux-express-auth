import axios from "axios";
import { store } from "../store";
import { logout } from "../actions/auth";

const AuthInstance = axios.create({
    baseUrl: "http://localhost:3005/api"
});

AuthInstance.interceptors.response.use((response) => {
    return response;
}, (err) => {
    store.dispatch(logout());
    return Promise.reject(err);
}); 


export default AuthInstance;