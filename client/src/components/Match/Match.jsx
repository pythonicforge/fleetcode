import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useUser } from './../client/Usercontext'; // adjust path as needed

const BASE_URL = "https://fleetcode.onrender.com";

function Match() {
  const { user } = useUser();
  const { match_id } = useParams();
  const location = useLocation();
  const opponent = location.state?.opponent || null;

  const [status, setStatus] = useState("connecting");
  const wsRef = useRef(null);

  useEffect(() => {
    if (!user?.id) {
      console.warn("User ID missing, cannot open WebSocket");
      return;
    }

    console.log(`Opening WebSocket connection to wss://${BASE_URL.replace(/^https?:\/\//, '')}/ws/match/${match_id}`);

    // Construct WebSocket URL explicitly
    const wsUrl = `${BASE_URL.replace("https", "wss").replace("http", "ws")}/ws/match/${match_id}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({ user_id: user.id }));
      setStatus("connected");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("Match WS message received:", msg);
      // Add your game logic here
    };

    ws.onerror = (err) => {
      console.error("Match WebSocket error event:", err);
      setStatus("error");
    };

    ws.onclose = (event) => {
      console.log(`WebSocket closed. Code: ${event.code}, Reason: ${event.reason}, WasClean: ${event.wasClean}`);
      setStatus("disconnected");
    };

    return () => {
      console.log("Closing WebSocket connection...");
      ws.close();
    };
  }, [user?.id, match_id]);

  if (!opponent) {
    return <div>Error: Opponent information is missing.</div>;
  }

  return (
    <div>
      <h2>Match ID: {match_id}</h2>
      <h3>Playing against: {opponent.username || opponent.id}</h3>
      <p>Status: {status}</p>

      {/* Your game UI here */}
    </div>
  );
}

export default Match;
