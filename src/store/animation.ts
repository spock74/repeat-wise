import { create } from 'zustand';

interface AnimationState {
  useCardAnimation: boolean;
  toggleCardAnimation: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  useCardAnimation: true,
  toggleCardAnimation: () => set((state) => ({ useCardAnimation: !state.useCardAnimation })),
}));
