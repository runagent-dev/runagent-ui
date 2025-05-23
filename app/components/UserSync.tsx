"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "@/services/api";

interface DecodedToken {
  sub: string;
  email: string;
  sid: string;
}

export function UserSync() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      // Check if already synced
      const lastSyncTime = localStorage.getItem('last-sync-time');
      const lastSyncSid = localStorage.getItem('last-sync-sid');
      
      if (!isLoaded || !isSignedIn || isSyncing) return;

      try {
        setIsSyncing(true);
        const token = await getToken();
        if (!token) return;

        localStorage.setItem('clerk-token', token);
        const decodedToken = jwtDecode<DecodedToken>(token);
        const session_id = decodedToken.sid;

        // Only sync if we haven't synced this session or if it's a new session
        if (lastSyncSid !== session_id) {
          await api.syncUser(session_id);
          localStorage.setItem('last-sync-time', Date.now().toString());
          localStorage.setItem('last-sync-sid', session_id);
          console.log("User synced successfully");
        } else {
          console.log("User already synced for this session");
        }
      } catch (error) {
        console.error("Failed to sync user:", error);
      } finally {
        setIsSyncing(false);
      }
    };

    syncUser();
  }, [getToken, isLoaded, isSignedIn, isSyncing]);

  return null; // This component doesn't render anything
} 