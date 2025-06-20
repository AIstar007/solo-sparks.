const QuestCard = ({ quest, onReflect }) => (
  <div style={styles.card}>
    <h3>{quest.title}</h3>
    <p><strong>Mood:</strong> {quest.mood}</p>
    <p><strong>Frequency:</strong> {quest.frequency}</p>
    <button onClick={() => onReflect(quest.title)} style={styles.button}>
      Reflect
    </button>
  </div>
);

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    width: "calc(50% - 20px)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default QuestCard;
