import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Session } from './types/Session';

const SESSION_KEY = 'checkout-session';

function loadSession(): Session | null {
  const value = localStorage.getItem(SESSION_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as Session;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

const sessionSlice = createSlice({
  name: 'session',
  initialState: loadSession(),
  reducers: {
    setSession: (_state, action: PayloadAction<Session | null>) => {
      return action.payload;
    },
  },
});

export const { setSession } = sessionSlice.actions;

export const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
  },
});

store.subscribe(() => {
  const session = store.getState().session;

  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;