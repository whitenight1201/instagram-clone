import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePageLayout from "../components/Layout/HomePageLayout";

import PageLogin from "../containers/PageLogin/PageLogin";
import PageSignUp from "../containers/PageSignUp/PageSignUp";
import HomePage from "../containers/PageHome/";
import PageNotFound from "../containers/PageNotFound/PageNotFound";

import { PrivateRoute } from "./PrivateRoute";

import { HOME, LOGIN, REGISTER } from "./routes";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<PageLogin />} />
        <Route path={REGISTER} element={<PageSignUp />} />

        <Route
          path={HOME}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
