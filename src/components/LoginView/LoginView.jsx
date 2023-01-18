import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be at least 5 characters long");
      isReq = false;
    }

    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr("Password must be at least 5 characters long");
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
          console.log(error);
          console.log("The user or password is incorrect!");
        });
    }
  };

  return (
    <Form
      className="p-4 square border border-primary rounded-3 m-5"
      onSubmit={handleSubmit}
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
          onChange={(e) => setUsername(e.target.value)}
          value={username}
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          required
        />
      </FloatingLabel>

      <div className="d-flex gap-3">
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <Button as={Link} to="/signup" variant="primary">
          Signup
        </Button>
      </div>
    </Form>
  );
};

export default LoginView;
