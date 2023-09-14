import axios from "axios";
import authHeader from "./auth-header";

export const getallposts = (pagenum: number, pagecnt: number) => {
  return axios
    .get(process.env.REACT_APP_BASE_URL + "posts/all", { headers: authHeader(), params:{pagenum, pagecnt} })
    .then((response) => {
      return response.data;
    });
};

const PostService = {
  getallposts,
};

export default PostService;
