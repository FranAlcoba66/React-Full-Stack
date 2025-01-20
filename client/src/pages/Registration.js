import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth/", data, {})
      .then((response) => {
        navigate("/");
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

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration