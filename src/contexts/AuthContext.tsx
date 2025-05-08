
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error?: Error }>;
  signUp: (email: string, password: string, metadata?: { full_name?: string, role?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        // Update user and session state
        setSession(session);
        setUser(session?.user ?? null);
        
        // Update user role
        if (session?.user) {
          const role = session.user.user_metadata?.role || 'client';
          console.log("User role from metadata:", role);
          setUserRole(role);
          
          // Only redirect on SIGNED_IN event to prevent redirection loops
          if (event === 'SIGNED_IN') {
            // Use setTimeout to prevent potential auth state deadlocks
            setTimeout(() => {
              redirectBasedOnRole(role);
            }, 0);
          }
        } else if (event === 'SIGNED_OUT') {
          setUserRole(null);
          // Only redirect to sign-in on explicit sign out
          navigate('/sign-in');
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const role = session.user.user_metadata?.role || 'client';
        console.log("Initial role from metadata:", role);
        setUserRole(role);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const redirectBasedOnRole = (role: string) => {
    console.log("Redirecting based on role:", role);
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else if (role === 'doctor') {
      navigate('/doctor-dashboard');
    } else {
      // Default to client dashboard
      navigate('/client-dashboard');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { user: data.user };
    } catch (error) {
      console.error("Sign in error:", error);
      return { user: null, error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: { full_name?: string, role?: string }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          ...metadata,
          role: metadata?.role || 'client', // Default role is client
        },
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate('/sign-in');
  };

  const value = {
    user,
    session,
    signIn,
    signUp,
    signOut,
    loading,
    userRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
