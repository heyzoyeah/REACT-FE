import axios from "../axios";

const handleLoginAPI = (emailUser, passwordUser) => {
  return axios.post("/api/login", { email: emailUser, password: passwordUser });
};

const handleGetUser = (idUser) => {
  return axios.get(`/api/get-all-users?id=${idUser}`);
};

export { handleLoginAPI, handleGetUser };
