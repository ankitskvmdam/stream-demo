import { useContext } from "react";
import { createContext } from "react";
import { createStore } from "zustand";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

export type TAdaptRealtimeState = {
  stream: MediaStream;
};

export type TAdaptRealtimeAction = {
  updateStream: (stream: MediaStream) => void;
};

export type TAdaptRealtimeStore = ReturnType<typeof createAdaptRealtimeStore>;

export const createAdaptRealtimeStore = (state: TAdaptRealtimeState) => {
  const { stream } = state;
  return createStore<TAdaptRealtimeState & TAdaptRealtimeAction>()((set) => ({
    stream,
    updateStream: (stream) => set({ stream }),
  }));
};

export const AdaptRealtimeContext = createContext<TAdaptRealtimeStore | null>(
  null
);

export function useAdaptRealtime<T>(
  selector: (state: TAdaptRealtimeState & TAdaptRealtimeAction) => T,
  equalityFn: (left: T, right: T) => boolean = shallow
): T {
  const store = useContext(AdaptRealtimeContext);
  if (!store)
    throw new Error("Missing AdaptRealtimeContext.Provider in the tree.");

  return useStoreWithEqualityFn(store, selector, equalityFn);
}
