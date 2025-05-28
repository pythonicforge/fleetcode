import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useUser } from './../client/Usercontext';
import ProblemDisp from './ProblemDisp';

const BASE_URL = "https://fleetcode.onrender.com";

function Match() {
  const { user } = useUser();
  const { match_id } = useParams();
  const location = useLocation();
  const [opponent, setOpponent] = useState(location.state?.opponent || null);
  const [status, setStatus] = useState("connecting");
  const [problemId, setProblemId] = useState(null);
  const wsRef = useRef(null);

  // Fallback to fetch opponent info
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
    if (!user?.id || !match_id || !opponent) return;

    const delay = setTimeout(() => {
      const wsUrl = `${BASE_URL.replace("https", "wss")}/ws/match/${match_id}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        ws.send(JSON.stringify({ user_id: user.id }));
        setStatus("connected");
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log("WebSocket message:", msg);

        if (msg.type === "problem") {
          setProblemId(msg.problem_id);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setStatus("error");
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed:", event);
        setStatus("disconnected");
      };
    }, 300); // slight delay

    return () => clearTimeout(delay);
  }, [user?.id, match_id, opponent]);

  if (!opponent) {
    return <div className="text-white p-4">Loading opponent information...</div>;
  }

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold">Match ID: {match_id}</h2>
      <h3 className="text-lg">Playing against: {opponent.username || opponent.id}</h3>
      <p className="mb-4">Status: {status}</p>

      {problemId ? (
        <ProblemDisp problem_id={problemId} />
      ) : (
        <p className="text-gray-400">Waiting for problem assignment...</p>
      )}
    </div>
  );
}

export default Match;
