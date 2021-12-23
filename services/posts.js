import axios from "axios";
import { ROOT_URL } from "./api";

export const getPosts = async (page) => {
  let response = await axios.get(`${ROOT_URL}/posts?per_page=9&page=${page}`);
  return response;
};
