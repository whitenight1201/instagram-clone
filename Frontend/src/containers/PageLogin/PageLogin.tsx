import React, { useState, useEffect } from "react";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../store/slices/auth";
import { clearMessage, setMessage } from "../../store/slices/message";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Spinner } from "../../shared/Spinner";

type Props = {};

const LoginPage: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const { message } = useAppSelector((state: any) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required!")
      .email("This is not a valid email."),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;

    setMessage("");
    setLoading(true);

    const data: any = {
      email: email,
      password: password,
    };

    dispatch(login(data))
      .unwrap()
      .then(
        () => {
          navigate("/");
          // window.location.reload();
        },
        (error: any) => {
          setLoading(false);
        }
      );

    // login(email, password).then(
    //   () => {
    //     navigate("/");
    //     window.location.reload();
    //   },
    //   (error) => {
    //     // console.log("~~~~~~~~~~"+ error.response.data.message);
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     setLoading(false);
    //     setMessage(resMessage);
    //   }
    // );
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col w-96 h-auto shadow-lg">
        {/* <div className="flex justify-center p-6">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="rounded-full p-4"
          />
        </div> */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="flex flex-col m-10">
              <label htmlFor="email">User Email</label>
              <Field
                name="email"
                type="text"
                className="w-full h-10 px-2 border border-gray-300 rounded-md focus:border-primary outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm w-full text-red-500"
              />
            </div>

            <div className="flex flex-col m-10">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full h-10 px-2 border border-gray-300 rounded-md focus:border-primary outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm w-full text-red-500"
              />
            </div>

            <div className="flex w-full h-full p-10">
              <button
                type="submit"
                className="flex w-full h-10 justify-center items-center rounded-md font-semibold text-xl text-white bg-primary"
                disabled={loading}
              >
                {loading && <Spinner />}
                <span>Login</span>
              </button>
            </div>

            {/* ==== */}
            <span className="block text-center text-neutral-800">
              New user? {` `}
              <Link className="text-green-600" to="/signup">
                Create an account
              </Link>
            </span>
            {message && (
              <div className="flex justify-center items-center">
                <div className="text-sm text-red-500" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
