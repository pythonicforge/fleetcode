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
    if (!user?.id) return;

    const ws = new WebSocket(`${BASE_URL.replace("https", "wss")}/ws/match/${match_id}`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ user_id: user.id }));
      setStatus("connected");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("Match WS message:", msg);
      // Add your game logic here
    };

    ws.onerror = (err) => {
      console.error("Match WebSocket error:", err);
      setStatus("error");
    };

    ws.onclose = () => {
      setStatus("disconnected");
    };

    return () => {
      ws.close();
    };
  }, [user, match_id]);

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
