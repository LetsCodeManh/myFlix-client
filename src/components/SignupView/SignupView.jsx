import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const SignupView = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });

  const [formDataErr, setFormDataErr] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });

  const validate = () => {
    let isReq = true;
    if (!formData.name) {
      setFormDataErr.name("Username Required");
      isReq = false;
    } else if (formData.name.length < 5) {
      setFormDataErr.name("Username must be at least 5 characters long");
      isReq = false;
    }

    if (!formData.password) {
      setFormDataErr.password("Password Required");
      isReq = false;
    } else if (formData.password.length < 5) {
      setFormDataErr.password("Password must be at least 5 characters long");
      isReq = false;
    }

    if (!formData.email) {
      setFormDataErr.email("Email Required");
      isReq = false;
    } else if (
      formData.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    ) {
      setFormDataErr.email("Invalid email address");
      isReq = false;
    }

    if (!formData.birthday) {
      setFormDataErr.birthday("Email Required");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isReq = validate();

    if (isReq) {
      try {
        const response = await axios.post(
          "https://young-journey-11100.herokuapp.com/users",
          {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
          }
        );
        window.open("/", "_self");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-5 square border border-primary rounded-3 m-5"
    >
      <h1 className="mb-3">Sign Up</h1>
      <FloatingLabel
        controlId="floatingUsernameSignup"
        label="Username"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          minLength="5"
          placeholder="Username"
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPasswordSignup"
        label="Password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          minLength="5"
          placeholder="Password"
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingEmailSignup"
        label="Email"
        className="mb-3"
      >
        <Form.Control
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingBirthdaySignup"
        label="Birthday"
        className="mb-3"
      >
        <Form.Control
          type="date"
          name="birthday"
          onChange={handleChange}
          value={formData.birthday}
          required
        />
      </FloatingLabel>

      <Button type="submit" variant="primary">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignupView;
