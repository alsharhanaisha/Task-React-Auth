import decode from "jwt-decode";
import { makeAutoObservable } from "mobx";
import instance from "./instance";

class AuthStore {
  user = null;
  constructor() {
    makeAutoObservable(this);
  }

  signup = async (userData) => {
    try {
      console.log(userData);
      const res = await instance.post("/signup", userData);
      const { token } = res.data;
      console.log(token);
      this.user = decode(token);
      localStorage.setItem("token", token);

      this.setUser(token);
    } catch (error) {
      console.log(error);
    }
  };

  signin = async (userData) => {
    console.log(userData);
    try {
      const res = await instance.post("/signin", userData);
      const { token } = res.data;
      console.log(token);
      this.user = decode(token);
      localStorage.setItem("token", token);

      this.setUser(token);
    } catch (error) {
      console.log(error);
    }
  };

  setUser = (token) => {
    this.user =
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  checkForToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decode(token);
      if (Date.now() < decodedToken.exp) {
        this.user = decodedToken;
      } else {
        this.user = null;
        localStorage.removeItem("token");
      }
    }
  };

  signOut = () => {
    this.user = null;
    localStorage.removeItem("token");
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
