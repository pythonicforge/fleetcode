import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditor({ userId, matchId }) {
  const [code, setCode] = useState("print('Hello, world!')");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8000/submission/submit", {
        user_id: userId,
        match_id: matchId,
        language: "python",
        code
      });

      setStatus(response.data.status);
      setOutput(response.data.output);
    } catch (err) {
      setStatus("Error");
      setOutput("Something went wrong :(");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1e1e1e",
        color: "#fff",
      }}
    >
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          defaultLanguage="python"
          defaultValue={code}
          value={code}
          onChange={(val) => setCode(val || "")}
          theme="vs-dark"
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <div
        style={{
          padding: "1vh",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#111",
        }}
      >
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            backgroundColor: "#10b981",
            padding: "1.5vh 3vw",
            color: "white",
            fontSize: "2vh",
            fontWeight: "bold",
            border: "none",
            borderRadius: "1vh",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Submitting..." : "SUBMIT T^T"}
        </button>
      </div>

      {/* OUTPUT DISPLAY */}
      <div
        style={{
          backgroundColor: "#111",
          padding: "1rem",
          borderTop: "1px solid #333",
          maxHeight: "30vh",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        <h3 style={{ margin: 0 }}>
          Verdict:{" "}
          <span style={{ color: status === "Passed" ? "#10b981" : "#ef4444" }}>
            {status}
          </span>
        </h3>
        <code>{output}</code>
      </div>
    </div>
  );
}
