import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [setbirthdayErr, setBirthdayErr] = useState("");

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

    if (!email) {
      setEmailErr("Email Required");
      isReq = false;
    } else if (email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      setEmailErr("Invalid email address");
      isReq = false;
    }

    if (!birthday) {
      setBirthdayErr("Email Required");
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

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-4 square border border-primary rounded-3 m-5"
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
          onChange={(e) => setUsername(e.target.value)}
          value={username}
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          onChange={(e) => setBirthday(e.target.value)}
          value={birthday}
          required
        />
      </FloatingLabel>

      <div className="d-flex gap-3">
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <Button as={Link} to="/login" variant="primary">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default SignupView;
