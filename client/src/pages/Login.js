import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth/login", data, {})
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username:</label>
          <ErrorMessage name="username" component="span"></ErrorMessage>
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="Your Username.."
          ></Field>

          <label>Password:</label>
          <ErrorMessage name="password" component="span"></ErrorMessage>
          <Field
            id="inputCreatePost"
            name="password"
            placeholder="Your password.."
          ></Field>

          <button type="submit"> Login </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
