import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios"; // Not directly relevant to text visibility

export default function CodeEditor() {
  const [code, setCode] = useState("print('Hello, world!')");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/submission/submit", {
        user_id: "c17c684e-2691-43a6-8c76-4bf6bae8c39c",
        match_id: "1bcdbe08-9c48-45f5-a230-6f9bd6717b9b",
        language: "python",
        code
      });

      setStatus(response.data.status);
      setOutput(response.data.output);
    } catch (err) {
      setStatus("Error");
      setOutput("Something went wrong :(");
      console.error("Error:", err);
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
          theme="light" 
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
          style={{
            backgroundColor: "#10b981",
            padding: "1.5vh 3vw",
            color: "white",
            fontSize: "2vh",
            fontWeight: "bold",
            border: "none",
            borderRadius: "1vh",
            cursor: "pointer"
          }}
        >
          SUBMIT T^T
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
          whiteSpace: "pre-wrap"
        }}
      >
        <h3 style={{ margin: 0 }}>Verdict: <span style={{ color: status === "Passed" ? "#10b981" : "#ef4444" }}>{status}</span></h3>
        <code>{output}</code>
      </div>
    </div>
  );
}
