import React, { useState, useEffect } from "react";
import "./App.css";

const moods = ["😊 Happy", "😢 Sad", "😠 Angry", "😌 Calm", "😐 Neutral"];

function App() {
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setHistory(storedEntries);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood || !entry.trim()) return;

    const newEntry = {
      date: new Date().toLocaleDateString(),
      mood,
      entry,
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
    setMood("");
    setEntry("");
  };

  return (
    <div className="app">
      <h1>Daily Mood Tracker</h1>
      <form onSubmit={handleSubmit}>
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">Select Mood</option>
          {moods.map((m, index) => (
            <option key={index} value={m}>{m}</option>
          ))}
        </select>
        <textarea
          placeholder="Write about your day..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        ></textarea>
        <button type="submit">Add Entry</button>
      </form>
      <div className="history">
        <h2>Previous Entries</h2>
        {history.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className="entry">
              <div><strong>{item.date}</strong> — {item.mood}</div>
              <p>{item.entry}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
