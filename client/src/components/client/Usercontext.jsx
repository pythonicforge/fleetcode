import { createContext, useContext, useEffect, useState } from 'react';
import supabase from './supabaseclient';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserAndProfile = async (session) => {
      setLoading(true);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profileData, error } = await supabase
          .from('profiles') // ✅ Using the correct table
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // Profile not found, create one
          const { error: insertError } = await supabase.from('profiles').insert({
            id: currentUser.id,
            email: currentUser.email,
            username: 'user_' + currentUser.id.slice(0, 6),
          });

          if (!insertError) {
            setProfile({
              id: currentUser.id,
              email: currentUser.email,
              username: 'user_' + currentUser.id.slice(0, 6),
            });
          } else {
            console.error('Error inserting profile:', insertError.message);
          }
        } else if (!error) {
          setProfile(profileData);
        } else {
          console.error('Error fetching profile:', error.message);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    };

    const fetchInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      await getUserAndProfile(session);
    };

    fetchInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      getUserAndProfile(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, loading }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;