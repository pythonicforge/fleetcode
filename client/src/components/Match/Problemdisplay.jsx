import React, { useEffect, useState } from 'react';

const BASE_URL = "https://fleetcode.onrender.com";

const ProblemDisp = ({ problem_id }) => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`${BASE_URL}/problems/${problem_id}`);
        if (!res.ok) throw new Error("Failed to fetch problem");
        const data = await res.json();
        setProblem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problem_id]);

  if (loading) return <p className="text-gray-400">Loading problem...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg text-white max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">{problem.title}</h2>
      
      <div>
        <p className="text-gray-300 font-semibold">Description:</p>
        <p>{problem.description}</p>
      </div>

      {problem.inputFormat && (
        <div>
          <p className="text-gray-300 font-semibold">Input Format:</p>
          <p>{problem.inputFormat}</p>
        </div>
      )}

      {problem.outputFormat && (
        <div>
          <p className="text-gray-300 font-semibold">Output Format:</p>
          <p>{problem.outputFormat}</p>
        </div>
      )}
    </div>
  );
};

export default ProblemDisp;
