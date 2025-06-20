import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReflectionPage = () => {
  const { questTitle } = useParams();
  const [type, setType] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      let content = textContent;

      // Upload file if type is photo or audio
      if (type === "photo" || type === "audio") {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await axios.post("http://localhost:5000/api/upload/file", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        content = uploadRes.data.url;
      }

      // Submit reflection to backend
      await axios.post(
        "http://localhost:5000/api/reflections",
        { questTitle, type, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Reflection submitted!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to submit reflection");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reflect on: {decodeURIComponent(questTitle)}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Reflection Type:
          <select value={type} onChange={(e) => setType(e.target.value)} style={styles.select}>
            <option value="text">Text</option>
            <option value="photo">Photo</option>
            <option value="audio">Audio</option>
          </select>
        </label>

        {type === "text" ? (
          <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Write your thoughts here..."
            style={styles.textarea}
            required
          />
        ) : (
          <input
            type="file"
            accept={type === "photo" ? "image/*" : "audio/*"}
            onChange={(e) => setFile(e.target.files[0])}
            required
            style={styles.input}
          />
        )}

        <button type="submit" style={styles.button}>Submit Reflection</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "600px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    minHeight: "120px",
  },
  input: {
    padding: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ReflectionPage;
