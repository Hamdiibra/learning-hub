import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

function Signup() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Sign Up Page</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          fetch("http://127.0.0.1:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: values.name,
              role: "student" // Assuming default role is student
            }),
          })
            .then((res) => res.json())
            .then(() => {
              navigate("/courses");
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Name:</label>
            <Field type="text" name="name" placeholder="Enter your name" />
            <ErrorMessage name="name" component="div" />
            <label>Email:</label>
            <Field type="email" name="email" placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" />
            <label>Password:</label>
            <Field type="password" name="password" placeholder="Enter your password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;