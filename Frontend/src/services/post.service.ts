import axios from "axios";
import authHeader from "./auth-header";

export const fetchposts = (pagenum: number) => {
  return axios
    .get(
      process.env.REACT_APP_BASE_URL + `posts/all?pagenum=${pagenum}&pagecnt=5`,
      { headers: authHeader() }
    )
    .then((response) => {
      return response;
    });
};

export const addpost = (postdata: FormData) => {
  return axios
    .post(process.env.REACT_APP_BASE_URL + "posts/add", postdata, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const PostService = {
  fetchposts,
  addpost,
};

export default PostService;
