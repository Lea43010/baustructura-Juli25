import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, createContext } from "react";
import * as React from "react";

// AuthProvider is a simple pass-through component since authentication is handled by the server
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useAuth() {
  try {
    // Safely try to get the QueryClient
    const queryClient = useQueryClient();
    
    const { data: user, isLoading, error } = useQuery({
      queryKey: ["/api/auth/user"],
      retry: false,
      enabled: !!queryClient,
    });

    return {
      user,
      isLoading,
      isAuthenticated: !!user,
      error,
    };
  } catch (contextError) {
    // Fallback when QueryClient context is not available
    console.warn("QueryClient not available, returning default auth state");
    return {
      user: null,
      isLoading: true,
      isAuthenticated: false,
      error: contextError,
    };
  }
}
