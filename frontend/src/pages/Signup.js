import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./AuthStyles.css"; // Import external CSS for styling

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          fetch("http://127.0.0.1:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: values.name,
              email: values.email,
              password: values.password,
              role: "student", // Default role
            }),
          })
            .then((res) => res.json())
            .then((data) => { 
              if (data.error) {
                alert(data.error);
              } else {
                navigate("/login");
              }
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="auth-form">
            <label>Name:</label>
            <Field type="text" name="name" placeholder="Enter your name" />
            <ErrorMessage name="name" component="div" className="error" />

            <label>Email:</label>
            <Field type="email" name="email" placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Password:</label>
            <Field type="password" name="password" placeholder="Enter your password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit" className="auth-button" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
