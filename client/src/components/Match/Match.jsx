import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useUser } from './../client/Usercontext';

const BASE_URL = "https://fleetcode.onrender.com";

function Match() {
  const { user } = useUser();
  const { match_id } = useParams();
  const location = useLocation();
  const [opponent, setOpponent] = useState(location.state?.opponent || null);
  const [status, setStatus] = useState("connecting");
  const wsRef = useRef(null);

  // Fallback fetch if opponent info is not passed via navigation
  useEffect(() => {
    if (!opponent && user?.id) {
      fetch(`${BASE_URL}/match/${match_id}`)
        .then(res => res.json())
        .then(data => {
          const opp = data.player1.id === user.id ? data.player2 : data.player1;
          setOpponent(opp);
        })
        .catch(err => {
          console.error("Failed to fetch match info:", err);
        });
    }
  }, [opponent, user?.id, match_id]);

  // WebSocket setup
  useEffect(() => {
    if (!user?.id || !opponent) {
      console.warn("User or opponent missing, WebSocket not opened.");
      return;
    }

    const wsUrl = `${BASE_URL.replace("https", "wss").replace("http", "ws")}/ws/match/${match_id}`;
    console.log(`Opening WebSocket connection to ${wsUrl}`);
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({
        type: "status_update",
        user_id: user.id,
        status: "connected"
      }));
      setStatus("connected");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("Match WS message received:", msg);
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
  }, [user?.id, match_id, opponent]);

  if (!opponent) {
    return <div>Loading opponent information...</div>;
  }

  return (
    <div>
      <h2>Match ID: {match_id}</h2>
      <h3>Playing against: {opponent.username || opponent.id}</h3>
      <p>Status: {status}</p>
    </div>
  );
}

export default Match;
