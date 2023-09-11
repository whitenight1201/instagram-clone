import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageLogin from "../containers/PageLogin/PageLogin";
import PageSignUp from "../containers/PageSignUp/PageSignUp";

import { LOGIN, REGISTER} from "./routes";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<PageLogin />} />
        <Route path={REGISTER} element={<PageSignUp />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
