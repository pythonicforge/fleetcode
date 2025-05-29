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
    const [timeLeft, setTimeLeft] = useState(null);
    const wsRef = useRef(null);
    const reconnectAttempts = useRef(0);

    // Fetch opponent info if not passed via location state
    useEffect(() => {
        if (!opponent && user?.id) {
            const fetchOpponent = async () => {
                try {
                    const res = await fetch(`${BASE_URL}/match/${match_id}`);
                    if (!res.ok) throw new Error("Failed to fetch match info");
                    
                    const data = await res.json();
                    const opp = data.player1.id === user.id ? data.player2 : data.player1;
                    setOpponent(opp);
                } catch (err) {
                    console.error("Error fetching opponent:", err);
                    // Retry after delay
                    setTimeout(fetchOpponent, 3000);
                }
            };
            fetchOpponent();
        }
    }, [opponent, user?.id, match_id]);

    // WebSocket connection management
    useEffect(() => {
        if (!user?.id || !match_id) return;

        const connectWebSocket = () => {
            if (wsRef.current) {
                wsRef.current.close();
            }

            const wsUrl = `${BASE_URL.replace("https", "wss")}/ws/match/${match_id}`;
            console.log("Connecting WebSocket to", wsUrl);
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log("WebSocket connected");
                reconnectAttempts.current = 0;
                ws.send(JSON.stringify({ 
                    type: "connection_init",
                    user_id: user.id 
                }));
                setStatus("connected");
            };

            ws.onmessage = (event) => {
                try {
                    const msg = JSON.parse(event.data);
                    console.log("WebSocket message:", msg);
                    
                    switch (msg.type) {
                        case "timer":
                            setTimeLeft(msg.time_left);
                            break;
                        case "status_update":
                            // Handle opponent status updates
                            break;
                        case "match_end":
                            // Handle match end
                            setStatus("ended");
                            break;
                        default:
                            console.log("Unhandled message type:", msg.type);
                    }
                } catch (err) {
                    console.error("Error parsing message:", err);
                }
            };

            ws.onerror = (err) => {
                console.error("WebSocket error:", err);
                setStatus("error");
            };

            ws.onclose = (event) => {
                console.log("WebSocket closed:", event);
                setStatus("disconnected");
                
                // Attempt reconnection if not normal closure
                if (event.code !== 1000 && reconnectAttempts.current < 5) {
                    reconnectAttempts.current += 1;
                    const delay = Math.min(3000 * reconnectAttempts.current, 15000);
                    console.log(`Reconnecting in ${delay}ms...`);
                    setTimeout(connectWebSocket, delay);
                }
            };
        };

        connectWebSocket();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [user?.id, match_id]);

    if (!opponent) {
        return <div>Loading opponent information...</div>;
    }

    return (
        <div>
            <h2>Match ID: {match_id}</h2>
            <h3>Playing against: {opponent.username || opponent.id}</h3>
            <p>Status: {status}</p>
            {timeLeft !== null && (
                <p>Time remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
            )}
        </div>
    );
}

export default Match;