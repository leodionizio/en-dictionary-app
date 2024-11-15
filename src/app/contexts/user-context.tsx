"use client";
import React, { createContext, useState, ReactNode, FC } from "react";
import { UserProfile } from "@/app/types/user";

interface UserContextType {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
}

const defaultContext: UserContextType = {
  user: { id: "", email: "", name: "" },
  setUser: () => {},
};

export const UserProfileContext = createContext<UserContextType>(defaultContext);

export const UserProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultContext.user);

  return (
    <UserProfileContext.Provider value={{ user, setUser }}>
      {children}
    </UserProfileContext.Provider>
  );
};
