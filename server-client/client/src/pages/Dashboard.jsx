import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [quests, setQuests] = useState([]);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [questsRes, userRes] = await Promise.all([
          axios.get("http://localhost:5000/api/quests/user", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setQuests(questsRes.data.quests);
        setPoints(userRes.data.points);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (questTitle) => {
    navigate(`/reflect/${encodeURIComponent(questTitle)}`);
  };

  const handleAddPoints = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        "http://localhost:5000/api/users/points/add",
        { points: 10 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Added 10 test points!");
      setPoints(res.data.points);
    } catch (err) {
      alert("❌ Failed to add points");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2>Your Solo Sparks Quests</h2>
          <p style={{ fontWeight: "bold" }}>💎 Spark Points: {points}</p>
        </div>
        <div style={styles.buttonGroup}>
          <button onClick={() => navigate("/rewards")} style={{ ...styles.button, backgroundColor: "#ffc107", color: "#000" }}>
            🎁 Go to Rewards
          </button>
          <button onClick={handleAddPoints} style={{ ...styles.button, backgroundColor: "#007bff" }}>
            ➕ Add 10 Points
          </button>
          <button onClick={logout} style={{ ...styles.button, backgroundColor: "#dc3545" }}>
            🚪 Logout
          </button>
        </div>
      </div>

      {quests.length === 0 ? (
        <p>Loading quests...</p>
      ) : (
        <div style={styles.questList}>
          {quests.map((q, index) => (
            <div key={index} style={styles.card}>
              <h3>{q.title}</h3>
              <p><strong>Mood:</strong> {q.mood}</p>
              <p><strong>Frequency:</strong> {q.frequency}</p>
              <button onClick={() => handleSelect(q.title)} style={styles.reflectButton}>
                Reflect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1000px",
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "30px",
    gap: "10px",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  button: {
    padding: "10px 16px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  questList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    width: "calc(50% - 20px)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  reflectButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Dashboard;
