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

  // Fallback to fetch opponent info if not passed via location state
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

  // WebSocket setup with delay to ensure user context is available
  useEffect(() => {
    if (!user?.id || !match_id || !opponent) {
      console.warn("Waiting for user ID or opponent to be available...");
      return;
    }

    const delay = setTimeout(() => {
      const wsUrl = `${BASE_URL.replace("https", "wss").replace("http", "ws")}/ws/match/${match_id}`;
      console.log("Connecting WebSocket to", wsUrl);
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket open. Sending user ID:", user.id);
        ws.send(JSON.stringify({ user_id: user.id }));
        setStatus("connected");
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log("Message from WebSocket:", msg);
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setStatus("error");
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed:", event);
        setStatus("disconnected");
      };
    }, 500); // delay to ensure user and opponent are ready

    return () => clearTimeout(delay);
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
