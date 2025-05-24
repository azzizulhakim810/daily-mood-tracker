import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const moods = ["Lovely😍","😊 Happy", "😢 Sad", "😠 Angry", "😌 Calm", "😐 Neutral"];

function App() {
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");
  const [history, setHistory] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setHistory(storedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(history));
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood || !entry.trim()) return;

    const newEntry = {
      date: new Date().toLocaleString(),
      mood,
      entry,
    };

    setHistory([newEntry, ...history]);
    setMood("");
    setEntry("");
    textareaRef.current?.focus();
  };

  return (
    <div className="app dark:bg-gray-900 dark:text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Daily Mood Tracker</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="">Select Mood</option>
          {moods.map((m, index) => (
            <option key={index} value={m}>{m}</option>
          ))}
        </select>
        <textarea
          ref={textareaRef}
          placeholder="Write about your day..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded resize-y min-h-[100px] dark:bg-gray-800 dark:border-gray-600"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Entry
        </button>
      </form>

      <div className="history max-w-xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Previous Entries</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No entries yet.</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className="entry bg-white dark:bg-gray-800 shadow p-4 mb-4 border-l-4 border-blue-600">
              <div className="font-semibold">{item.date} — {item.mood}</div>
              <p className="mt-2 whitespace-pre-wrap">{item.entry}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
