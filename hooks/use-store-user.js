import { useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function useStoreUser() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  // When this state is set we know the server
  // has stored the user.
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [isStoring, setIsStoring] = useState(false);
  const storeUser = useMutation(api.users.store);
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // If the user is not logged in don't do anything
    if (!isAuthenticated) {
      return;
    }
    let mounted = true;
    setError(null);
    setIsStoring(true);
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      try {
        const id = await storeUser();
        if (mounted) setUserId(id);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setIsStoring(false);
      }
    }
    createUser();
    return () => {
      mounted = false;
      setUserId(null);
      setError(null);
    };
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [isAuthenticated, storeUser, user?.id]);
  // Combine the local state with the state from context
  return {
    isLoading: isLoading || isStoring || (isAuthenticated && userId === null && !error),
    isAuthenticated: isAuthenticated && userId !== null,
    error,
  };
}