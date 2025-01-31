import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./AuthStyles.css"; // Import external CSS for styling

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
        onSubmit={(values, { setSubmitting }) => {
          fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: values.username, password: values.password }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                alert(data.error);
              } else {
                localStorage.setItem('token', data.token); // Store the token in local storage
                localStorage.setItem('userId', data.user.id);
                navigate("/profile");
              }
              setSubmitting(false);
            })
            .catch((err) => {
              console.error("Error during login:", err);
              alert("An error occurred. Please try again.");
              setSubmitting(false);
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
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
