import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const SignupView = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://young-journey-11100.herokuapp.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
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
      <FloatingLabel controlId="floatingEmailSignup" label="Email" className="mb-3">
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
