"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type CreateChallengeState = {
  title: string;
  startDate: string;
  endDate: string;
  thumbnail: File | null;
  description: string;
  hashtags: { name: string }[];
  certImage: File | null;
  setTitle: (title: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setThumbnail: (thumbnail: File | null) => void;
  setDescription: (description: string) => void;
  setHashtags: (hashtags: { name: string }[]) => void;
  setCertImage: (certImage: File | null) => void;
  reset: () => void;
};

const initialState = {
  title: "",
  startDate: "",
  endDate: "",
  thumbnail: null as File | null,
  description: "",
  hashtags: [] as { name: string }[],
  certImage: null as File | null,
};

const CreateChallengeContext = createContext<CreateChallengeState | null>(null);

export function CreateChallengeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState);

  const value: CreateChallengeState = {
    ...state,
    setTitle: (title) => setState((prev) => ({ ...prev, title })),
    setStartDate: (startDate) => setState((prev) => ({ ...prev, startDate })),
    setEndDate: (endDate) => setState((prev) => ({ ...prev, endDate })),
    setThumbnail: (thumbnail) => setState((prev) => ({ ...prev, thumbnail })),
    setDescription: (description) =>
      setState((prev) => ({ ...prev, description })),
    setHashtags: (hashtags) => setState((prev) => ({ ...prev, hashtags })),
    setCertImage: (certImage) => setState((prev) => ({ ...prev, certImage })),
    reset: () => setState(initialState),
  };

  return (
    <CreateChallengeContext.Provider value={value}>
      {children}
    </CreateChallengeContext.Provider>
  );
}

export function useCreateChallenge() {
  const context = useContext(CreateChallengeContext);
  if (!context) {
    throw new Error(
      "useCreateChallenge must be used within CreateChallengeProvider"
    );
  }
  return context;
}
