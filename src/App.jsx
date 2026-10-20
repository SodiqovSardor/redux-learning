import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { fetchUsers } from "./Features/GetUsersSlice";
import { deleteUser } from "./Features/DeleteUsersSlice";
import { useEffect } from "react";
import UserAddModal from "./Components/Modals/UserAddModal";
import UserEditModal from "./Components/Modals/UserEditModal";

const pageStyle = {
  minHeight: "100vh",
  background: "#0f0f0f",
  color: "#f4decd",
  fontFamily: "system-ui, sans-serif",
};

const App = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [addOpen, setAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  if (status === "loading")
    return (
      <div style={pageStyle}>
        <p
          style={{
            textAlign: "center",
            marginTop: "40px",
            fontSize: "13px",
            color: "#888e7b",
          }}
        >
          Loading...
        </p>
      </div>
    );
  if (status === "failed")
    return (
      <div style={pageStyle}>
        <p
          style={{
            textAlign: "center",
            marginTop: "40px",
            fontSize: "13px",
            color: "#f16e65",
          }}
        >
          Error loading users
        </p>
      </div>
    );

  return (
    <div style={pageStyle}>
      <div
        style={{
          maxWidth: "380px",
          margin: "0 auto",
          padding: "32px 16px",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
            Users
          </h1>
          <button
            style={{
              padding: "5px 12px",
              border: "none",
              borderRadius: "6px",
              background: "#71b4d6",
              color: "#0f0f0f",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 600,
            }}
            onClick={() => setAddOpen(true)}
          >
            Add User
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
                padding: "10px 0",
                borderBottom: "1px solid #3b403c",
              }}
            >
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.name}
                <span style={{ color: "#888e7b" }}> · {user.email}</span>
              </span>
              <span style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                <button
                  style={{
                    padding: 0,
                    border: "none",
                    background: "none",
                    color: "#6c756f",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                  onClick={() => setEditingUser(user)}
                >
                  Edit
                </button>
                <button
                  style={{
                    padding: 0,
                    border: "none",
                    background: "none",
                    color: "#f16e65",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                  onClick={() => dispatch(deleteUser(user.id))}
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>

        <UserAddModal open={addOpen} onClose={() => setAddOpen(false)} />
        <UserEditModal
          open={!!editingUser}
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      </div>
    </div>
  );
};

export default App;
