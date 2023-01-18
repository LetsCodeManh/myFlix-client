import { useState } from "react";

const ProfileView = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://young-journey-11100.herokuapp.com/user/${user.username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
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

  return (
    <div>
      <h1>Profile</h1>
      {editing ? (
        <>
          <label>
            Name:
            <input
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>Username: {user.username}</p>
          <p>Password: {user.password}</p>
          <p>Email: {user.email}</p>
          <p>Birthday: {user.birthday}</p>
          <p>FavoriteMovies: {user.favoriteMovies}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default ProfileView;
