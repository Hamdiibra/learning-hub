import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./AuthStyles.css";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                alert(data.error);
              } else {
                localStorage.setItem("token", data.token);
                navigate("/courses"); // Redirect to courses page after login
              }
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="auth-form">
            <label>Username:</label>
            <Field type="text" name="username" placeholder="Enter your username" />
            <ErrorMessage name="username" component="div" className="error" />

            <label>Password:</label>
            <Field type="password" name="password" placeholder="Enter your password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit" className="auth-button" disabled={isSubmitting}>
              Log-in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
