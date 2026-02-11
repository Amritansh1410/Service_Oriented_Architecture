import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type AppUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load Supabase profile
  const loadProfile = async (authUser: any) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", authUser.id)
      .maybeSingle();

    setUser({
      id: authUser.id,
      email: authUser.email,
      name: data?.full_name ?? authUser.email.split("@")[0],
      role: data?.role ?? "student",
    });
  };

  // Initial session load
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await loadProfile(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    init();

    // Auth state change listener
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          await loadProfile(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    await loadProfile(data.user); // update user state
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
