import React, { useState, useRef } from 'react';
import { useUser } from './../client/Usercontext'; // adjust path as needed
import { useNavigate } from 'react-router-dom';

const BASE_URL = "https://fleetcode.onrender.com";

function Matchmaking() {
  const { user } = useUser();
  const [status, setStatus] = useState("idle"); // idle, searching, matched
  const pollingTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const pollMatch = async () => {
    try {
      const res = await fetch(`${BASE_URL}/match/find`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      const data = await res.json();
      console.log("Matchmaking response data:", data);
      console.log(data.match_id);

      if (data.match_id) {
        console.log("Match found:", data.match_id);

        setStatus("matched");

        // Navigate with full match object and userId
        navigate(`/match/${data.match_id}`, {
          state: {
            match: data,
            userId: user.id
          }
        });

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
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
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
