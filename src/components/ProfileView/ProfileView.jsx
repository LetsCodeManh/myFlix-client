import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import FavoriteMovies from "../FavoriteMovies/FavoriteMovies";
import { format } from "date-fns";

const ProfileView = () => {
  const [editing, setEditing] = useState(false);
  const user = useSelector((state) => state.user);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://young-journey-11100.herokuapp.com/users/${user.username}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      setSuccess("User updated successfully.");
      setEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setUpdatedUser({ ...user });
  };

  const handleChange = (event) => {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  };

  const formattedBirthday = format(new Date(updatedUser.birthday), "yyyy-MM-dd")

  // const password = user.password
  // const replacedPassword = "*".repeat(password.length)

  return (
    <main className="p-5">
      <h1 className="mb-4">Profile</h1>
      {editing ? (
        <Form>
          <FloatingLabel
            controlId="floatingUsernameChanged"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="username"
              onChange={handleChange}
              value={updatedUser.username}
              placeholder="Username"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPasswordChanged"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              value={updatedUser.password}
              placeholder="Password"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingEmailChanged"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              value={updatedUser.email}
              placeholder="Email"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingBirthdayChanged"
            label="Birthday"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="birthday"
              onChange={handleChange}
              value={formattedBirthday}
            />
          </FloatingLabel>

          <div className="d-flex gap-3">
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="primary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      ) : (
        <div>
          <div>
            <h4>Username</h4>
            <p>{user.username}</p>
          </div>
          <div>
            <h4>Password</h4>
            <p>********</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Birthday</h4>
            <p>{formattedBirthday}</p>
          </div>
          <Button variant="primary" onClick={handleEdit}>
            Change Profile Data
          </Button>
          <FavoriteMovies />
        </div>
      )}
    </main>
  );
};

export default ProfileView;
