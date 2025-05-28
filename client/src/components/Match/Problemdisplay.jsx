import React from 'react';

const ProblemDisplay = ({ problem }) => {
  if (!problem) {
    return <div>Loading problem...</div>;
  }

  return (
    <div className="problem-display">
      <h2>{problem.title}</h2>
      <p><strong>Description:</strong></p>
      <p>{problem.description}</p>
      
      {problem.inputFormat && (
        <>
          <p><strong>Input Format:</strong></p>
          <p>{problem.inputFormat}</p>
        </>
      )}

      {problem.outputFormat && (
        <>
          <p><strong>Output Format:</strong></p>
          <p>{problem.outputFormat}</p>
        </>
      )}
    </div>
  );
};

export default ProblemDisplay;
