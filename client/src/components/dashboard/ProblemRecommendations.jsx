import React from 'react';
import { Target, Star, Code, ArrowRight, Clock, Users, Zap } from 'lucide-react';
import './ProblemRecommendations.css';

const ProblemRecommendations = () => {
  const problems = [
    {
      title: 'Advanced Binary Search',
      difficulty: 'Medium',
      rating: 1750,
      
      description: 'Master advanced binary search patterns and edge cases for optimal performance',
      
      category: 'Algorithms'
    },
    {
      title: 'Dynamic Programming Mastery', 
      difficulty: 'Hard',
      rating: 1900,
      
      description: 'Complex DP state transitions and optimization problems with real-world applications',
      
      category: 'Dynamic Programming'
    },
    {
      title: 'Graph Theory Fundamentals',
      difficulty: 'Medium',
      rating: 1650,
      
      description: 'Essential graph algorithms and traversal methods for competitive programming',
      
      category: 'Graph Theory'
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
          <span className="problem-recommendations__tag-text">Personalized for you</span>
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
                    
                  </div>
                </div>
                <div className="problem-recommendations__stats">
                  <Users className="problem-recommendations__users-icon" />
                 
                </div>
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