import React, { useState, useRef, useEffect } from 'react';
import { useUser } from './../client/Usercontext';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "https://fleetcode.onrender.com";

function Matchmaking() {
    const { user } = useUser();
    const [status, setStatus] = useState("idle"); // idle, searching, matched
    const [error, setError] = useState(null);
    const pollingTimeoutRef = useRef(null);
    const navigate = useNavigate();

    // Clean up polling on unmount
    useEffect(() => {
        return () => {
            if (pollingTimeoutRef.current) {
                clearTimeout(pollingTimeoutRef.current);
            }
        };
    }, []);

    const pollMatch = async () => {
        if (!user?.id) {
            setError("User not authenticated");
            setStatus("idle");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/match/find`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user.id }),
            });

            // Handle non-OK responses
            if (!res.ok) {
                throw new Error(res.statusText || "Failed to find match");
            }

            const data = await res.json();
            console.log("Matchmaking response:", data);

            if (data.match_id) {
                // Match found
                console.log("Match found:", data.match_id);
                setStatus("matched");

                // Determine opponent
                const opponent = data.player1.id === user.id ? data.player2 : data.player1;

                // Navigate to match page
                navigate(`/match/${data.match_id}`, { 
                    state: { opponent },
                    replace: true  // Prevent going back to matchmaking
                });
            } else if (data.detail === "Waiting for opponent...") {
                // Continue polling
                setStatus("searching");
                pollingTimeoutRef.current = setTimeout(pollMatch, 3000);
            } else {
                // Unexpected response
                setError(data.detail || "Unexpected response from server");
                setStatus("idle");
            }
        } catch (err) {
            console.error("Matchmaking error:", err);
            setError(err.message);
            setStatus("idle");
            
            // Retry after delay if it was a network error
            if (err.name === "TypeError" || err.name === "NetworkError") {
                pollingTimeoutRef.current = setTimeout(pollMatch, 5000);
            }
        }
    };

    const joinQueue = () => {
        setError(null);
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
            {error && <div className="error">{error}</div>}
            
            {status !== "searching" ? (
                <button onClick={joinQueue} disabled={!user}>
                    Join Queue
                </button>
            ) : (
                <>
                    <button onClick={stopQueue}>Stop Queue</button>
                    <p>Searching for opponent...</p>
                </>
            )}
        </div>
    );
}

export default Matchmaking;