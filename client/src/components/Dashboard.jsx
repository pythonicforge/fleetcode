import React from 'react';
// import Navbar from './dashboard/Navbar';
import UserProfile from './dashboard/UserProfile';
import BattleQueue from './dashboard/BattleQueue';
import RecentBattles from './dashboard/RecentBattles';
import ProblemRecommendations from './dashboard/ProblemRecommendations';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <Navbar /> */}
      
      <div className="dashboard__container">
        <div className="dashboard__grid">
          <div className="dashboard__left-column">
            <UserProfile />
          </div>
          
          <div className="dashboard__center-column">
            <BattleQueue />
            <RecentBattles />
          </div>
          
          <div className="dashboard__right-column">
            <ProblemRecommendations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;