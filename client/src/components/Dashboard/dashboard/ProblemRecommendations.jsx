import React from 'react';
import { Target, Star, Code, ArrowRight, Clock, Users, Zap } from 'lucide-react';
import '../../styles/problemrecommendations.css';

const ProblemRecommendations = () => {
  const problems = [
    {
      title: 'Advanced Binary Search',
      difficulty: 'Medium',
      tags: ['Binary Search', 'Arrays'],
      rating: 1750,
      solved: 1234,
      description: 'Master advanced binary search patterns and edge cases',
      estimatedTime: '45 min',
      category: 'Algorithms'
    },
    {
      title: 'Dynamic Programming Mastery', 
      difficulty: 'Hard',
      tags: ['DP', 'Optimization'],
      rating: 1900,
      solved: 856,
      description: 'Complex DP state transitions and optimization problems',
      estimatedTime: '60 min',
      category: 'Dynamic Programming'
    },
    {
      title: 'Graph Theory Fundamentals',
      difficulty: 'Medium',
      tags: ['Graphs', 'DFS', 'BFS'],
      rating: 1650,
      solved: 2100,
      description: 'Essential graph algorithms and traversal methods',
      estimatedTime: '40 min',
      category: 'Graph Theory'
    },
    {
      title: 'String Manipulation Expert',
      difficulty: 'Easy',
      tags: ['Strings', 'Pattern Matching'],
      rating: 1500,
      solved: 3200,
      description: 'Advanced string processing and pattern recognition',
      estimatedTime: '30 min',
      category: 'Strings'
    },
    {
      title: 'Tree Data Structures',
      difficulty: 'Medium',
      tags: ['Trees', 'Recursion'],
      rating: 1700,
      solved: 1800,
      description: 'Binary trees, BSTs, and advanced tree operations',
      estimatedTime: '50 min',
      category: 'Data Structures'
    },
    {
      title: 'Advanced Sorting Techniques',
      difficulty: 'Hard',
      tags: ['Sorting', 'Algorithms'],
      rating: 1850,
      solved: 950,
      description: 'Custom sorting algorithms and complex comparisons',
      estimatedTime: '55 min',
      category: 'Sorting'
    }
  ];

  return (
    <div className="problem-recommendations">
      <div className="problem-recommendations__header">
        <div className="problem-recommendations__title-section">
          <Target className="problem-recommendations__target-icon" />
          <h2>Recommended Problems</h2>
        </div>
        <span className="problem-recommendations__personalized-tag">
          <Zap className="problem-recommendations__zap-icon" />
          Personalized for you
        </span>
      </div>
      
      <div className="problem-recommendations__list">
        {problems.map((problem, index) => (
          <div key={index} className="problem-recommendations__item">
            <div className="problem-recommendations__content">
              <div className="problem-recommendations__header-row">
                <h3 className="problem-recommendations__title">{problem.title}</h3>
                <div className="problem-recommendations__category-badge">
                  {problem.category}
                </div>
              </div>
              
              <p className="problem-recommendations__description">{problem.description}</p>
              
              <div className="problem-recommendations__meta-row">
                <div className="problem-recommendations__meta-left">
                  <span className={`problem-recommendations__difficulty-badge problem-recommendations__difficulty-badge--${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                  <div className="problem-recommendations__rating">
                    <Star className="problem-recommendations__star-icon" />
                    <span>{problem.rating}</span>
                  </div>
                  <div className="problem-recommendations__time">
                    <Clock className="problem-recommendations__clock-icon" />
                    <span>{problem.estimatedTime}</span>
                  </div>
                </div>
                <div className="problem-recommendations__stats">
                  <Users className="problem-recommendations__users-icon" />
                  <span>{problem.solved.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="problem-recommendations__tags">
                {problem.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="problem-recommendations__tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <button className="problem-recommendations__solve-btn">
              <Code className="problem-recommendations__solve-icon" />
              <span>Solve</span>
              <ArrowRight className="problem-recommendations__arrow-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemRecommendations;
