import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // LOGIN
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password
        });

        localStorage.setItem("token", res.data.token);
      } else {
        // REGISTER
        await API.post("/auth/register", form);
        alert("Registered successfully! Please login.");
        setIsLogin(true);
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {!isLogin && (
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}

      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p style={{ marginTop: "20px", cursor: "pointer", color: "blue" }}
         onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default Auth;
