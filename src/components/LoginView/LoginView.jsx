import { useState } from "react";

// Username: 167OLdP5BUfLZGxP
// Password: K39eKYhPMV9DDWhJ

const LoginView = ({ onLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://young-journey-11100.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        console.error(e)
        alert("Something went wrong");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginView;
