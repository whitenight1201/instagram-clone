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

export const fetchcomments = (post_id: string) => {
  return axios
    .get(process.env.REACT_APP_BASE_URL + `commentaries/${post_id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return { respdata: response.data, post_id };
    });
};

export const addcomment = (post_id: string, commentary: string) => {
  return axios
    .post(
      process.env.REACT_APP_BASE_URL + `commentaries/${post_id}`,
      { commentary },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const addliketopost = (post_id: string, like: boolean) => {
  return axios
    .post(
      process.env.REACT_APP_BASE_URL + `like/${post_id}`,
      { like },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

const PostService = {
  fetchposts,
  addpost,
  fetchcomments,
  addcomment,
  addliketopost,
};

export default PostService;
