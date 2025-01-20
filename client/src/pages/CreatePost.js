import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreatePost() {

  const navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data, {}).then((response) => {
      navigate("/");
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  return (
    <div >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title:</label>
          <ErrorMessage name="title" component="span"></ErrorMessage>
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="Ex. title.."
          ></Field>
          <label>Post:</label>
          <ErrorMessage name="postText" component="span"></ErrorMessage>
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="Ex. Post.."
          ></Field>
          <label>Username:</label>
          <ErrorMessage name="username" component="span"></ErrorMessage>
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="Ex. Username.."
          ></Field>
          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
