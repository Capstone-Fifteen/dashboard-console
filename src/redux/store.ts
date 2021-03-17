import { configureStore } from '@reduxjs/toolkit';
import authenticatedReducer from './reducer/authenticatedSlice';

// Store redux state to browser localStorage
const storeToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.warn(e);
  }
};

// Load redux state from browser localStorage
const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem('reduxState');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    authenticated: authenticatedReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

// Only store authenticated token
store.subscribe(() => {
  storeToLocalStorage({
    authenticated: store.getState().authenticated,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
