import React, { useState, useEffect } from 'react';
import { 
  Sword, 
  Clock, 
  User, 
  Users, 
  MessageCircle, 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Star, 
  Code, 
  ArrowRight, 
  History, 
  Trophy, 
  X, 
  Flame 
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [isQueuing, setIsQueuing] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [queueTime, setQueueTime] = useState(0);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let interval;
    if (isQueuing && !matchFound) {
      interval = setInterval(() => {
        setQueueTime(prev => prev + 1);
        if (queueTime >= 4) {
          setMatchFound(true);
          setCountdown(10);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isQueuing, matchFound, queueTime]);

  useEffect(() => {
    let interval;
    if (matchFound && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [matchFound, countdown]);

  const handleQueue = () => {
    if (isQueuing) {
      setIsQueuing(false);
      setQueueTime(0);
      setMatchFound(false);
      setCountdown(0);
    } else {
      setIsQueuing(true);
      setQueueTime(0);
    }
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-logo">
            <div className="logo-icon">
              <Sword className="logo-sword" />
            </div>
            <span className="logo-text">FleetCode</span>
          </div>
          
          <div className="nav-links">
            <a href="#" className="nav-link active">
              <span>Dashboard</span>
            </a>
            <a href="#" className="nav-link">
              <Trophy className="nav-icon" />
              <span>Leaderboard</span>
            </a>
            <a href="#" className="nav-link">
              <MessageCircle className="nav-icon" />
              <span>Forum</span>
            </a>
          </div>
          
          <div className="user-menu">
            <div className="user-avatar">
              <User className="avatar-icon" />
            </div>
            <div className="user-info">
              <div className="username">CodeMaster</div>
              <div className="user-rank">Rank #42</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  // User Profile Component
  const UserProfile = () => (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            <span className="avatar-initials">CM</span>
          </div>
          <div className="online-indicator"></div>
        </div>
        <div className="profile-info">
          <h3 className="profile-name">CodeMaster</h3>
          <div className="profile-badges">
            <div className="elite-badge">Elite</div>
            <span className="rank-text">Rank #42</span>
          </div>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Trophy />
          </div>
          <div className="stat-value">1,847</div>
          <div className="stat-label">Rating</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp />
          </div>
          <div className="stat-value">73%</div>
          <div className="stat-label">Win Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Target />
          </div>
          <div className="stat-value">156</div>
          <div className="stat-label">Battles</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Flame />
          </div>
          <div className="stat-value">12</div>
          <div className="stat-label">Streak</div>
        </div>
      </div>
      
      <button className="edit-profile-btn">Edit Profile</button>
    </div>
  );

  // Battle Queue Component
  const BattleQueue = () => (
    <div className="battle-queue-card">
      <div className="queue-content">
        <h2 className="queue-title">
          <Sword className="title-icon" />
          <span>1v1 Battle Arena</span>
        </h2>
        
        {!isQueuing && !matchFound && (
          <div className="queue-ready">
            <p className="queue-subtitle">Ready to prove your coding skills?</p>
            <button onClick={handleQueue} className="queue-btn">
              <div className="btn-content">
                <Sword className="btn-icon" />
                <span>Queue for Battle</span>
              </div>
            </button>
          </div>
        )}
        
        {isQueuing && !matchFound && (
          <div className="queue-searching">
            <div className="searching-animation">
              <div className="search-icon">
                <Clock className="spinning-clock" />
              </div>
              <p className="search-text">Searching for opponent...</p>
              <p className="queue-time">Queue time: {queueTime}s</p>
            </div>
            <button onClick={handleQueue} className="cancel-btn">
              Cancel Queue
            </button>
          </div>
        )}
        
        {matchFound && (
          <div className="match-found">
            <div className="match-container">
              <h3 className="match-title">Match Found!</h3>
              <div className="vs-container">
                <div className="player">
                  <div className="player-avatar">
                    <span className="player-initials">CM</span>
                  </div>
                  <p className="player-name">You</p>
                  <p className="player-rating">Rating: 1,847</p>
                </div>
                <div className="vs-text">VS</div>
                <div className="player">
                  <div className="player-avatar">
                    <User className="player-icon" />
                  </div>
                  <p className="player-name">ByteNinja</p>
                  <p className="player-rating">Rating: 1,823</p>
                </div>
              </div>
              <div className="countdown-container">
                <div className="countdown-number">{countdown}</div>
                <p className="countdown-text">Battle starts in...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Friends List Component
  const FriendsList = () => {
    const friends = [
      { name: 'ByteNinja', status: 'online', activity: 'In Battle' },
      { name: 'AlgoHero', status: 'online', activity: 'Available' },
      { name: 'CodeWizard', status: 'offline', activity: 'Last seen 2h ago' },
      { name: 'DevMaster', status: 'online', activity: 'In Queue' },
      { name: 'ScriptLord', status: 'offline', activity: 'Last seen 1d ago' },
    ];

    return (
      <div className="friends-card">
        <div className="friends-header">
          <div className="friends-title">
            <Users className="friends-icon" />
            <h2>Friends</h2>
          </div>
          <span className="online-count">
            {friends.filter(f => f.status === 'online').length} online
          </span>
        </div>
        
        <div className="friends-list">
          {friends.map((friend, index) => (
            <div key={index} className="friend-item">
              <div className="friend-info">
                <div className="friend-avatar-container">
                  <div className="friend-avatar">
                    <span className="friend-initial">{friend.name.charAt(0)}</span>
                  </div>
                  <div className={`friend-status ${friend.status}`}></div>
                </div>
                <div className="friend-details">
                  <div className="friend-name">{friend.name}</div>
                  <div className="friend-activity">{friend.activity}</div>
                </div>
              </div>
              
              <div className="friend-actions">
                <button className="friend-action-btn">
                  <MessageCircle className="action-icon" />
                </button>
                {friend.status === 'online' && friend.activity === 'Available' && (
                  <button className="friend-action-btn">
                    <Sword className="action-icon" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Leaderboard Component
  const Leaderboard = () => {
    const leaderboardData = [
      { rank: 1, name: 'AlgoMaster', rating: 2156, change: '+23', trending: 'up' },
      { rank: 2, name: 'CodeNinja', rating: 2089, change: '+12', trending: 'up' },
      { rank: 3, name: 'ByteWizard', rating: 2045, change: '-5', trending: 'down' },
      { rank: 4, name: 'DevLegend', rating: 1998, change: '+8', trending: 'up' },
      { rank: 5, name: 'ScriptKing', rating: 1967, change: '+15', trending: 'up' },
      { rank: 42, name: 'CodeMaster (You)', rating: 1847, change: '+7', trending: 'up', isUser: true },
    ];

    return (
      <div className="leaderboard-card">
        <div className="leaderboard-header">
          <Crown className="crown-icon" />
          <h2>Global Leaderboard</h2>
        </div>
        
        <div className="leaderboard-list">
          {leaderboardData.map((player) => (
            <div key={player.rank} className={`leaderboard-item ${player.isUser ? 'user-item' : ''}`}>
              <div className="player-info">
                <div className={`rank-badge ${player.rank <= 3 ? 'top-rank' : ''}`}>
                  {player.rank}
                </div>
                <div className="player-details">
                  <div className="player-name">{player.name}</div>
                  <div className="player-points">{player.rating} pts</div>
                </div>
              </div>
              
              <div className="player-change">
                <span className={`change-value ${player.trending}`}>{player.change}</span>
                {player.trending === 'up' ? (
                  <TrendingUp className="trend-icon" />
                ) : (
                  <TrendingDown className="trend-icon down" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Recent Battles Component
  const RecentBattles = () => {
    const battles = [
      { opponent: 'ByteNinja', result: 'win', time: '2 hours ago', duration: '12:34', problem: 'Two Sum Variants' },
      { opponent: 'AlgoMaster', result: 'loss', time: '5 hours ago', duration: '15:22', problem: 'Binary Tree Traversal' },
      { opponent: 'CodeWizard', result: 'win', time: '1 day ago', duration: '09:45', problem: 'Dynamic Programming' },
      { opponent: 'DevHero', result: 'win', time: '2 days ago', duration: '11:12', problem: 'Graph Algorithms' }
    ];

    return (
      <div className="battles-card">
        <div className="battles-header">
          <History className="history-icon" />
          <h2>Recent Battles</h2>
        </div>
        
        <div className="battles-list">
          {battles.map((battle, index) => (
            <div key={index} className="battle-item">
              <div className="battle-info">
                <div className={`battle-result ${battle.result}`}>
                  {battle.result === 'win' ? <Trophy className="result-icon" /> : <X className="result-icon" />}
                </div>
                <div className="battle-details">
                  <div className="battle-opponent">vs {battle.opponent}</div>
                  <div className="battle-problem">{battle.problem}</div>
                </div>
              </div>
              <div className="battle-meta">
                <div className={`battle-outcome ${battle.result}`}>
                  {battle.result.toUpperCase()}
                </div>
                <div className="battle-time">{battle.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Problem Recommendations Component
  const ProblemRecommendations = () => {
    const problems = [
      {
        title: 'Advanced Binary Search',
        difficulty: 'Medium',
        tags: ['Binary Search', 'Arrays'],
        rating: 1750,
        solved: 1234,
        description: 'Master advanced binary search patterns'
      },
      {
        title: 'Dynamic Programming Patterns', 
        difficulty: 'Hard',
        tags: ['DP', 'Optimization'],
        rating: 1900,
        solved: 856,
        description: 'Complex DP state transitions'
      },
      {
        title: 'Graph Theory Fundamentals',
        difficulty: 'Medium',
        tags: ['Graphs', 'DFS', 'BFS'],
        rating: 1650,
        solved: 2100,
        description: 'Essential graph algorithms'
      }
    ];

    return (
      <div className="problems-card">
        <div className="problems-header">
          <Target className="target-icon" />
          <h2>Recommended Problems</h2>
          <span className="personalized-tag">Personalized for you</span>
        </div>
        
        <div className="problems-list">
          {problems.map((problem, index) => (
            <div key={index} className="problem-item">
              <div className="problem-info">
                <h3 className="problem-title">{problem.title}</h3>
                <p className="problem-description">{problem.description}</p>
                <div className="problem-meta">
                  <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                  <div className="problem-rating">
                    <Star className="star-icon" />
                    <span>{problem.rating}</span>
                  </div>
                </div>
                <div className="problem-tags">
                  {problem.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="problem-solved">
                  {problem.solved.toLocaleString()} developers solved this
                </div>
              </div>
              <button className="solve-btn">
                <Code className="solve-icon" />
                <span>Solve</span>
                <ArrowRight className="arrow-icon" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <Navigation />
      
      <div className="dashboard-container">
        <div className="dashboard-grid">
          <div className="left-column">
            <UserProfile />
            <FriendsList />
          </div>
          
          <div className="center-column">
            <BattleQueue />
            <RecentBattles />
            <ProblemRecommendations />
          </div>
          
          <div className="right-column">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;