import './hero.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
function Hero() {
  return (
    <div className="hero-container">
      <Navbar />
      {/* Section 1 */}
      <section className="section section-1">
        
        <div className="daddy">
          <div className="left-div">
            <h1 className="hero-title">
              Battle Coders <span className="metallic-gradient">Worldwide</span><br /> in Real-Time
            </h1>
            <p className="hero-subtitle">
              Compete live with programmers across the globe in 1v1 algorithm duels.{" "}
              <span>Solve fast</span>,{" "}
              <span>solve smart</span>,{" "}
              <span>win big</span>.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn-primary">
                Get Started →
              </Link>
            </div>
          </div>
          <div className="float-div">
            <div className="float">
              <strong>two_sum.py</strong><br />
              <pre>
{`def two_sum(nums, target):
  for i in range(len(nums)):
    for j in range(i+1, len(nums)):
      if nums[i] + nums[j] == target:
        return [i, j]`}
              </pre>
            </div>
            <div className="float">
              <strong>PLAYER 1</strong><br />
              Solving...
            </div>
            <div className="float">
              <strong>TIME LEFT</strong><br />
              03:47

            </div>
          </div>
        </div>
                <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-value">10K+</div>
            <div className="stat-label">Active Coders</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">50K+</div>
            <div className="stat-label">Battles Won</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Live Matches</div>
          </div>
        </div>
      </section>

      {/* Section 2 */}



      {/* Section 3 */}
      <section className="section section-3">
        <div className="tech-section">
          <h2 className="tech-title">
            Powered by <span className="metallic-gradient">Modern Tech</span>
          </h2>
          <p className="tech-subtitle">
            Built with cutting-edge technologies to deliver lightning-fast,
            real-time coding battles
          </p>
          <div className="tech-icons">
            <div className="tech-card">
              <div className="tech-icon">💻</div>
              <h3>React</h3>
              <p>Modern UI components</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🌐</div>
              <h3>Node.js</h3>
              <p>High-performance backend</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🔌</div>
              <h3>WebSocket</h3>
              <p>Real-time communication</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">⚙️</div>
              <h3>Rust Engine</h3>
              <p>Lightning-fast execution</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🗄️</div>
              <h3>PostgreSQL</h3>
              <p>Reliable data storage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="section section-4">
        <div className="why-section">
          <h2 className="why-title">
            Why Choose <span>FleetCode?</span>
          </h2>
          <p className="why-subtitle">
            Experience competitive programming like never before with our
            comprehensive platform
          </p>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">💻</div>
              <h3>Live Code Editor</h3>
              <p>
                Real-time synchronized coding environment with syntax highlighting
                and auto-completion
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">🧠</div>
              <h3>Skill-Based Matching</h3>
              <p>
                Advanced ELO system pairs you with coders of similar skill levels
                for fair competition
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">🎯</div>
              <h3>DSA Focused</h3>
              <p>
                Curated problems covering data structures, algorithms, and
                competitive programming patterns
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">🏆</div>
              <h3>Global Leaderboard</h3>
              <p>
                Climb the rankings and earn prestigious coding titles as you win
                more battles
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">⏱️</div>
              <h3>Problem Analytics</h3>
              <p>
                Track your performance, solution times, and improvement over time
                with detailed insights
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">👥</div>
              <h3>Community Driven</h3>
              <p>
                Connect with programmers worldwide and participate in tournaments
                and events
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Hero;
