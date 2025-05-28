import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../client/Usercontext';
import CodeEditor from '../CodeEditor';
import ProblemDisplay from './Problemdisplay';
import TimerDisplay from './Timerdisplay';

const BASE_URL = 'https://fleetcode.onrender.com';

const MatchInterface = () => {
  const { match_id } = useParams();
  const { user } = useUser();

  const [problem, setProblem] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const ws = useRef(null);

  // Fetch problem and establish WebSocket
  useEffect(() => {
    const init = async () => {
      try {
        // Get match details
        const res = await fetch(`${BASE_URL}/match/${match_id}`);
        const matchData = await res.json();

        const questionId = matchData.problem_id;
        if (!questionId) return console.error("No problem_id in match");

        // Fetch question
        const questionRes = await fetch(`${BASE_URL}/question/${questionId}`);
        const questionData = await questionRes.json();
        setProblem(questionData);

        // WebSocket
        ws.current = new WebSocket(`wss://fleetcode.onrender.com/ws/match/${match_id}`);

        ws.current.onopen = () => {
          console.log('WebSocket connected');
          ws.current.send(JSON.stringify({ type: 'join', user_id: user.id }));
        };

        ws.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'timer') setTimeLeft(data.time_left);
          if (data.type === 'match_end') {
            console.log("Match ended:", data.reason);
            ws.current.close();
          }
        };

        ws.current.onclose = () => console.log('WebSocket disconnected');
      } catch (err) {
        console.error('Error loading match:', err);
      }
    };

    init();

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [match_id, user.id]);

  const handleCodeSubmit = async (code, language) => {
    try {
      const res = await fetch(`${BASE_URL}/judge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          match_id,
          user_id: user.id,
          code,
          language,
        }),
      });

      const result = await res.json();
      console.log('Judge result:', result);

      // Optionally notify via WebSocket
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({
          type: 'status_update',
          user_id: user.id,
          status: result.status,
        }));
      }
    } catch (err) {
      console.error('Error submitting code:', err);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <TimerDisplay timeLeft={timeLeft} />
      <ProblemDisplay problem={problem} />
      <CodeEditor userId={user.id} matchId={match_id} onSubmit={handleCodeSubmit} />
    </div>
  );
};

export default MatchInterface;
