import React from 'react';
import { History, Trophy, X } from 'lucide-react';
import './../styles/recentbattles.css';

const RecentBattles = () => {
  const battles = [
    { opponent: 'ByteNinja', result: 'win', time: '2 hours ago', duration: '12:34', problem: 'Two Sum Variants' },
    { opponent: 'AlgoMaster', result: 'loss', time: '5 hours ago', duration: '15:22', problem: 'Binary Tree Traversal' },
    { opponent: 'CodeWizard', result: 'win', time: '1 day ago', duration: '09:45', problem: 'Dynamic Programming' },
    { opponent: 'DevHero', result: 'win', time: '2 days ago', duration: '11:12', problem: 'Graph Algorithms' }
  ];

  return (
    <div className="recent-battles">
      <div className="recent-battles__header">
        <History className="recent-battles__history-icon" />
        <h2>Recent Battles</h2>
      </div>
      
      <div className="recent-battles__list">
        {battles.map((battle, index) => (
          <div key={index} className="recent-battles__item">
            <div className="recent-battles__info">
              <div className={`recent-battles__result recent-battles__result--${battle.result}`}>
                {battle.result === 'win' ? <Trophy className="recent-battles__result-icon" /> : <X className="recent-battles__result-icon" />}
              </div>
              <div className="recent-battles__details">
                <div className="recent-battles__opponent">vs {battle.opponent}</div>
                <div className="recent-battles__problem">{battle.problem}</div>
              </div>
            </div>
            <div className="recent-battles__meta">
              <div className={`recent-battles__outcome recent-battles__outcome--${battle.result}`}>
                {battle.result.toUpperCase()}
              </div>
              <div className="recent-battles__time">{battle.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBattles;
