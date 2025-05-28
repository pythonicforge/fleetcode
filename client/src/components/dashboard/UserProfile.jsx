import React, { useState } from 'react';
import { Trophy, TrendingUp, Target, Flame } from 'lucide-react';
import './UserProfile.css';
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import supabase from './../client/supabaseclient';
import { useUser } from './../client/Usercontext';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useUser();

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(profile?.username || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [uploading, setUploading] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleSave = async () => {
    const updates = {
      id: user.id,
      username,
      email,
      avatar_url: avatarUrl,
    };

    const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);
    if (error) {
      alert('Error saving profile: ' + error.message);
    } else {
      alert('Profile updated!');
      setEditing(false);
    }
  };

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrlData.publicUrl);
    } catch (error) {
      alert('Error uploading avatar: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading || !profile) return <div className="user-profile">Loading...</div>;

  const initials = profile.username?.slice(0, 2).toUpperCase() || 'U';
  const rank = profile.rank || 'Unranked';
  const rating = profile.rating ?? 'N/A';
  const winRate = profile.win_rate !== undefined ? `${profile.win_rate}%` : 'N/A';
  const battles = profile.battles ?? 'N/A';
  const streak = profile.streak ?? 'N/A';

  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <div className="user-profile__avatar-container">
          <div className="user-profile__avatar">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="user-profile__avatar-img"
              />
            ) : (
              <span className="user-profile__avatar-initials">{initials}</span>
            )}
          </div>
          <div className="user-profile__online-indicator"></div>
        </div>
        <div className="user-profile__info">
          <div>
            <h3 className="user-profile__name">{profile.username}</h3>
            <div className="user-profile__badges">
              <div className="user-profile__elite-badge">Elite</div>
              <span className="user-profile__rank-text">Rank #{rank}</span>
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
          <div className="user-profile__stat-icon"><Trophy /></div>
          <div className="user-profile__stat-value">{rating}</div>
          <div className="user-profile__stat-label">Rating</div>
        </div>
        <div className="user-profile__stat-card">
          <div className="user-profile__stat-icon"><TrendingUp /></div>
          <div className="user-profile__stat-value">{winRate}</div>
          <div className="user-profile__stat-label">Win Rate</div>
        </div>
        <div className="user-profile__stat-card">
          <div className="user-profile__stat-icon"><Target /></div>
          <div className="user-profile__stat-value">{battles}</div>
          <div className="user-profile__stat-label">Battles</div>
        </div>
        <div className="user-profile__stat-card">
          <div className="user-profile__stat-icon"><Flame /></div>
          <div className="user-profile__stat-value">{streak}</div>
          <div className="user-profile__stat-label">Streak</div>
        </div>
      </div>

      <button
        className="user-profile__edit-btn"
        onClick={() => setEditing(!editing)}
      >
        {editing ? 'Cancel' : 'Edit Profile'}
      </button>

      {editing && (
        <div className="user-profile__edit-form">
          <label>
            Change Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Change Email 
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Upload Avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
          {uploading && <p>Uploading...</p>}
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
