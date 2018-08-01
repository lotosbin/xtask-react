const auth = {
    isAuthenticated: function () {
        return localStorage.getItem("api_host") && localStorage.getItem("api_key")
    },
    authenticate(api_host, api_key, cb) {
        localStorage.setItem("api_host", api_host);
        localStorage.setItem("api_key", api_key);
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        localStorage.removeItem("api_host");
        localStorage.removeItem("api_key");
        setTimeout(cb, 100);
    },
    getAuth: function () {
        return {
            api_host: localStorage.getItem("api_host"),
            api_key: localStorage.getItem("api_key")
        }
    }
};
export default auth;