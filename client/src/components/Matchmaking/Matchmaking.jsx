import React, { useState, useRef } from 'react';
import { useUser } from './../client/Usercontext'; // adjust path as needed
import { useNavigate } from 'react-router-dom';

const BASE_URL = "https://fleetcode.onrender.com";

function Matchmaking() {
  const { user } = useUser();
  const [status, setStatus] = useState("idle"); // idle, searching, matched
  const wsRef = useRef(null);
  const pollingTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const pollMatch = async () => {
    try {
      const res = await fetch(⁠ ${BASE_URL}/match/find ⁠, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      const data = await res.json();
      console.log("Matchmaking response data:", data);
      console.log(data.match_id);

      if (data.match_id) {
        console.log("Match found:", data.match_id);
        console.log(${BASE_URL.replace("https", "wss")}/ws/match/${data.match_id})
        const ws = new WebSocket(⁠ ${BASE_URL.replace("https", "wss")}/ws/match/${data.match_id} ⁠);
        wsRef.current = ws;
        console.log("WebSocket created for match:", data.match_id);
        
        ws.onopen = () => {
          ws.send(JSON.stringify({ user_id: user.id }));
        
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.status === "matched") {
            setStatus("matched");
            ws.close();

            // Navigate to /match/:match_id passing opponent info in state
            navigate(⁠ /match/${data.match_id} ⁠, { state: { opponent: msg.opponent } });
          }
        };

        ws.onerror = (e) => {
          console.error("WebSocket error:", e);
          setStatus("idle");
        };
      } else if (data.detail) {
        if (data.detail === "Waiting for opponent...") {
          pollingTimeoutRef.current = setTimeout(pollMatch, 3000);
        } else {
          console.warn("Matchmaking status:", data.detail);
          setStatus("idle");
        }
      } else {
        console.error("Unexpected response:", data);
        setStatus("idle");
      }
    } catch (err) {
      console.error("Error during matchmaking:", err);
      setStatus("idle");
    }
  };

  const joinQueue = () => {
    if (!user?.id) {
      console.error("User ID is undefined!");
      return;
    }

    setStatus("searching");
    pollMatch();
  };

  const stopQueue = () => {
    setStatus("idle");

    // Clear the polling timeout to stop repeated polling
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
    }

    // Close the WebSocket if open
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  return (
    <div>
      <h2>Matchmaking</h2>
      {status !== "searching" && (
        <button onClick={joinQueue}>
          Join Queue
        </button>
      )}

      {status === "searching" && (
        <>
          <button onClick={stopQueue}>Stop Queue</button>
          <p>Waiting for opponent...</p>
        </>
      )}
    </div>
  );
}

export default Matchmaking;
