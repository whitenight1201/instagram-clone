import axios from "axios";
import authHeader from "./auth-header";

export const fetchposts = (pagenum: number) => {
  return axios
    .get(process.env.REACT_APP_BASE_URL + `posts/all?pagenum=${pagenum}&pagecnt=5`, { headers: authHeader() })
    .then((response) => {
      return response;
    });
};

const PostService = {
  fetchposts
};

export default PostService;
