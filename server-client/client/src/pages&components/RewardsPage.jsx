import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const RewardsPage = () => {
  const { logout } = useAuth();
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Simulated reward items
  const rewards = [
    { name: "Profile Boost", cost: 20 },
    { name: "Exclusive Prompt", cost: 35 },
    { name: "Hidden Content Access", cost: 50 },
  ];

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPoints(res.data.points);
      } catch (err) {
        console.error("Failed to fetch points", err);
      }
    };

    fetchPoints();
  }, [token]);

  const handleRedeem = async (cost) => {
    if (points < cost) {
      setMessage("❌ Not enough points!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.patch(
        "http://localhost:5000/api/users/points/redeem",
        { cost },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPoints(res.data.points);
      setMessage("✅ Reward redeemed!");
    } catch (err) {
      setMessage("❌ Failed to redeem.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🎁 Rewards Store</h2>
      <p>Current Spark Points: <strong>{points}</strong></p>
      {message && <p>{message}</p>}

      <div style={styles.rewards}>
        {rewards.map((reward, index) => (
          <div key={index} style={styles.card}>
            <h3>{reward.name}</h3>
            <p>Cost: {reward.cost} points</p>
            <button
              style={styles.button}
              onClick={() => handleRedeem(reward.cost)}
              disabled={loading}
            >
              Redeem
            </button>
          </div>
        ))}
      </div>

      <button style={styles.logout} onClick={logout}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "auto",
    padding: "30px",
  },
  rewards: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "10px",
    width: "calc(50% - 20px)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logout: {
    marginTop: "40px",
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default RewardsPage;