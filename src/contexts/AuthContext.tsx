
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

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
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle session and user state
  useEffect(() => {
    console.log("AuthContext init effect running");
    
    // Set loading state initially
    if (!initialized) {
      setLoading(true);
    }

    // First set up the auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("Auth state changed:", event, currentSession?.user?.id);
      
      // Update session and user state
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        // Get role from user metadata
        const role = currentSession.user.user_metadata?.role || 'client';
        console.log("User role from metadata:", role);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      
      // Set initialized and loading state
      setInitialized(true);
      setLoading(false);
    });

    // Then check for existing session
    const checkSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      console.log("Initial session check:", currentSession?.user?.id);
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        const role = currentSession.user.user_metadata?.role || 'client';
        console.log("Initial role from metadata:", role);
        setUserRole(role);
      }
      
      setInitialized(true);
      setLoading(false);
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // We don't auto-redirect in the context
  // Let individual components handle their own redirects

  const redirectBasedOnRole = (role: string) => {
    if (role === 'admin') {
      navigate('/admin-dashboard', { replace: true });
    } else if (role === 'doctor') {
      navigate('/doctor-dashboard', { replace: true });
    } else {
      navigate('/client-dashboard', { replace: true });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Get role from user metadata
      const role = data.user?.user_metadata?.role || 'client';
      
      // Handle redirection after successful sign-in
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
      
      // Redirect based on role immediately
      redirectBasedOnRole(role);
      
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
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/sign-in', { replace: true });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
