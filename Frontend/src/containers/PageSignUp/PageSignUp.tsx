import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { IUser } from "../../types/user";
import { register } from "../../store/slices/auth";
import { clearMessage } from "../../store/slices/message";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [successful, setSuccessful] = useState<boolean>(false);
  const [images, setImages] = React.useState<ImageType[]>([]);

  const { message } = useAppSelector((state: any) => state.message);
  const dispatch = useAppDispatch();

  const maxNumber = 69;
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
    avatar: {},
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

    const avatar = images[0] !== undefined ? images[0].file : "";

    const data: IUser = {
      username: username,
      email: email,
      password: password,
      avatar: avatar,
    };

    dispatch(register(data))
      .unwrap()
      .then(
        () => {
          setSuccessful(true);
          navigate("/login");
        },
        (error: any) => {
          setSuccessful(false);
        }
      );
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col w-96 h-auto shadow-lg">
        <div className="flex justify-center px-10">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="flex flex-col w-full justify-center items-center gap-y-3">
                <button
                  type="submit"
                  className="w-full h-10 justify-center items-center rounded-md font-semibold text-xl text-white bg-green-600 hover:bg-green-700"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Select Your Avatar
                </button>

                {imageList.map((image, index) => (
                  <div key={index} className="flex flex-col w-full">
                    <div className="flex justify-center items-center w-32 h-32 rounded-full overflow-hidden mx-auto">
                      <img
                        src={image.dataURL}
                        alt=""
                        className="object-cover h-full"
                      />
                    </div>
                    <div className="flex justify-between px-4">
                      <button
                        className="px-3 h-8 rounded-md font-semibold text-xl text-white bg-green-600 hover:bg-green-700"
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                      </button>
                      <button
                        className="px-3 h-8 rounded-md font-semibold text-xl text-white bg-green-600 hover:bg-green-700"
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
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
              <div className="flex w-full justify-center items-center">
                <div
                  className={
                    successful
                      ? "text-sm text-green-500"
                      : "text-sm text-red-500"
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
