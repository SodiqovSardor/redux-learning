import { useDispatch } from "react-redux";
import { useState } from "react";
import { addUser } from "../../Features/AddUsersSlice";

const inputStyle = {
  padding: "6px 0",
  border: "none",
  borderBottom: "1px solid #3b403c",
  fontSize: "14px",
  outline: "none",
  background: "transparent",
  color: "#f4decd",
  caretColor: "#71b4d6",
};

const UserAddModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    if (!name.trim()) return;
    dispatch(addUser({ name, email }));
    setName("");
    setEmail("");
    onClose();
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#1e1f1e",
          border: "1px solid #272a28",
          borderRadius: "8px",
          padding: "24px",
          width: "280px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          color: "#f4decd",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
          Add User
        </h3>
        <input
          style={inputStyle}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={inputStyle}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "14px",
            marginTop: "4px",
          }}
        >
          <button
            style={{
              padding: 0,
              border: "none",
              background: "none",
              color: "#6c756f",
              cursor: "pointer",
              fontSize: "13px",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={{
              padding: 0,
              border: "none",
              background: "none",
              color: "#71b4d6",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAddModal;
