import axios from "../axios";

const handleLoginAPI = (emailUser, passwordUser) => {
  return axios.post("/api/login", { email: emailUser, password: passwordUser });
};

export { handleLoginAPI };
