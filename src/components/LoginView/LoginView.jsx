import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const LoginView = ({ onLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [formDataErr, setFormDataErr] = useState({
    name: "",
    password: "",
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

    return isReq;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://young-journey-11100.herokuapp.com/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          const data = response.data;
          onLoggedIn(data);
        })
        .catch((error) => {
          console.log("The user or password is incorrect!" + error);
        });
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
      <h1 className="mb-3">Login</h1>
      <FloatingLabel
        controlId="floatingUsernameLogin"
        label="Username"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPasswordLogin"
        label="Password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          required
        />
      </FloatingLabel>

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
};

export default LoginView;
