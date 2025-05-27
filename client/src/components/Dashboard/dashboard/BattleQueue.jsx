import React, { useState, useEffect } from 'react';
import { Sword, Clock, User } from 'lucide-react';
import './../styles/battlequeue.css';

const BattleQueue = () => {
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

  return (
    <div className="battle-queue">
      <div className="battle-queue__content">
        <h2 className="battle-queue__title">
          <Sword className="battle-queue__title-icon" />
          <span>1v1 Battle Arena</span>
        </h2>
        
        {!isQueuing && !matchFound && (
          <div className="battle-queue__ready">
            <p className="battle-queue__subtitle">Ready to prove your coding skills?</p>
            <button onClick={handleQueue} className="battle-queue__btn">
              <div className="battle-queue__btn-content">
                <Sword className="battle-queue__btn-icon" />
                <span>Queue for Battle</span>
              </div>
            </button>
          </div>
        )}
        
        {isQueuing && !matchFound && (
          <div className="battle-queue__searching">
            <div className="battle-queue__searching-animation">
              <div className="battle-queue__search-icon">
                <Clock className="battle-queue__spinning-clock" />
              </div>
              <p className="battle-queue__search-text">Searching for opponent...</p>
              <p className="battle-queue__queue-time">Queue time: {queueTime}s</p>
            </div>
            <button onClick={handleQueue} className="battle-queue__cancel-btn">
              Cancel Queue
            </button>
          </div>
        )}
        
        {matchFound && (
          <div className="battle-queue__match-found">
            <div className="battle-queue__match-container">
              <h3 className="battle-queue__match-title">Match Found!</h3>
              <div className="battle-queue__vs-container">
                <div className="battle-queue__player">
                  <div className="battle-queue__player-avatar">
                    <span className="battle-queue__player-initials">CM</span>
                  </div>
                  <p className="battle-queue__player-name">You</p>
                  <p className="battle-queue__player-rating">Rating: 1,847</p>
                </div>
                <div className="battle-queue__vs-text">VS</div>
                <div className="battle-queue__player">
                  <div className="battle-queue__player-avatar">
                    <User className="battle-queue__player-icon" />
                  </div>
                  <p className="battle-queue__player-name">ByteNinja</p>
                  <p className="battle-queue__player-rating">Rating: 1,823</p>
                </div>
              </div>
              <div className="battle-queue__countdown-container">
                <div className="battle-queue__countdown-number">{countdown}</div>
                <p className="battle-queue__countdown-text">Battle starts in...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleQueue;
