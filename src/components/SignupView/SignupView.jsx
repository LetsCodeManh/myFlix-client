import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          minLength="5"
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
          minLength="5"
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          name="birthday"
          onChange={handleChange}
          value={formData.birthday}
          required
        />
      </label>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupView;
