import React from 'react';
import { Trophy, TrendingUp, Target, Flame } from 'lucide-react';
import './UserProfile.css';
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import supabase from './../client/supabaseclient';

const UserProfile = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <div className="user-profile__avatar-container">
          <div className="user-profile__avatar">
            <span className="user-profile__avatar-initials">CM</span>
          </div>
          <div className="user-profile__online-indicator"></div>
        </div>
        <div className="user-profile__info">
          <div>     
            <h3 className="user-profile__name">
              CodeMaster
            </h3>
            <div className="user-profile__badges">
              <div className="user-profile__elite-badge">Elite</div>
              <span className="user-profile__rank-text">Rank #42</span>
            </div>
          </div>
        </div>
        <div 
          style={{ marginLeft: '1rem', fontSize: '2rem', cursor: 'pointer' }} 
          onClick={logout}
          title="Logout"
        >
          <MdLogout />
        </div>
      </div>
      
      <div className="user-profile__stats-grid">
        <div className="user-profile__stat-card">
          <div className="user-profile__stat-icon">
            <Trophy />
          </div>
          <div className="user-profile__stat-value">1,847</div>
          <div className="user-profile__stat-label">Rating</div>
        </div>
        <div className="user-profile__stat-card">
          <div className="user-profile__stat-icon">
            <TrendingUp />
          </div>
          <div className="user-profile__stat-value">73%</div>
          <div className="user-profile__stat-label">Win Rate</div>
        </div>
        <div className="user-profile__stat-card">
          <div className="user-profile__stat-icon">
            <Target />
          </div>
          <div className="user-profile__stat-value">156</div>
          <div className="user-profile__stat-label">Battles</div>
        </div>
        <div className="user-profile__stat-card">
          <div className="user-profile__stat-icon">
            <Flame />
          </div>
          <div className="user-profile__stat-value">12</div>
          <div className="user-profile__stat-label">Streak</div>
        </div>
      </div>
      
      <button className="user-profile__edit-btn">Edit Profile</button>
    </div>
  );
};

export default UserProfile;
