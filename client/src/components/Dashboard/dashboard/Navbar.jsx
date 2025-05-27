import React from 'react';
import { Sword, Trophy, MessageCircle, User } from 'lucide-react';
import '../../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__content">
          <div className="navbar__logo">
            <div className="navbar__logo-icon">
              <Sword className="navbar__logo-sword" />
            </div>
            <span className="navbar__logo-text">FleetCode</span>
          </div>
          
          <div className="navbar__links">
            <a href="#" className="navbar__link navbar__link--active">
              <span>Dashboard</span>
            </a>
            <a href="#" className="navbar__link">
              <Trophy className="navbar__icon" />
              <span>Leaderboard</span>
            </a>
            <a href="#" className="navbar__link">
              <MessageCircle className="navbar__icon" />
              <span>Forum</span>
            </a>
          </div>
          
          <div className="navbar__user-menu">
            <div className="navbar__user-avatar">
              <User className="navbar__avatar-icon" />
            </div>
            <div className="navbar__user-info">
              <div className="navbar__username">CodeMaster</div>
              <div className="navbar__user-rank">Rank #42</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

