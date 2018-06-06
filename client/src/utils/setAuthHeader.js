import AuthInstance from "./axiosAuth";

export default function setAuthHeader(token) {
    if (token) {
        AuthInstance.defaults.headers.common["authorization"] = `Baerer ${token}`;
    } else {
        delete AuthInstance.defaults.headers.common["authorization"];
    }
}