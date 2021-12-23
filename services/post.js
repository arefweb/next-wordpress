import axios from "axios";
import { ROOT_URL } from "./api";

export const getPost = async (id) => {
  let response = await axios.get(`${ROOT_URL}/posts/${id}`);
  return response;
};
