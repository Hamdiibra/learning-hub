import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./AuthStyles.css";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form values:", values);
          fetch("http://127.0.0.1:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: values.username, 
              password: values.password,
              role: "student",
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Signup response:", data);
              if (data.error) {
                alert(data.error);
              } else {
                alert("Signup successful! Redirecting to Courses...");
                navigate("/courses");
              }
            })
            .catch((err) => {
              console.error("Error during signup:", err);
              alert("An error occurred. Please try again.");
            })
            .finally(() => setSubmitting(false)); // Ensure UI unlocks
        }}
      >
        {({ isSubmitting }) => (
          <Form className="auth-form">
            <label>Username:</label>
            <Field type="text" name="username" placeholder="Enter your name" />
            <ErrorMessage name="username" component="div" className="error" />

            <label>Password:</label>
            <Field type="password" name="password" placeholder="Enter your password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit" className="auth-button" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
