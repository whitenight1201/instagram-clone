import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { IUser } from "../../types/user";
import { register } from "../../services/auth.service";

const RegisterPage: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue: IUser) => {
    const { username, email, password } = formValue;

    register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        navigate("/login");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col w-96 h-auto shadow-lg">
        <div className="flex justify-center p-6">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="rounded-full p-4"
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="flex flex-col m-10">
                  <label htmlFor="username"> Username </label>
                  <Field
                    name="username"
                    type="text"
                    className="w-full h-10 px-2 border border-gray-300 rounded-md focus:border-primary outline-none"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-sm w-full text-red-500"
                  />
                </div>

                <div className="flex flex-col m-10">
                  <label htmlFor="email"> Email </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full h-10 px-2 border border-gray-300 rounded-md focus:border-primary outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm w-full text-red-500"
                  />
                </div>

                <div className="flex flex-col m-10">
                  <label htmlFor="password"> Password </label>
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
                  >
                    Sign Up
                  </button>
                </div>
                {/* ==== */}
                <span className="block text-center text-neutral-700">
                  Already have an account? {` `}
                  <Link className="text-green-600" to="/login">
                    Sign in
                  </Link>
                </span>
              </div>
            )}

            {message && (
              <div className="flex ">
                <div
                  className={
                    successful
                      ? "text-sm w-full tex-green-500"
                      : "text-sm w-full text-red-500"
                  }
                  role="alert"
                >
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

export default RegisterPage;
