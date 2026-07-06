import { useCallback, useReducer } from "react";

export interface WindowState {
  appId: string;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
}

interface ManagerState {
  windows: Record<string, WindowState>;
  order: string[]; // open order, for cascade offsets
  nextZ: number;
}

type Action =
  | { type: "open"; appId: string; x: number; y: number }
  | { type: "close"; appId: string }
  | { type: "focus"; appId: string }
  | { type: "minimize"; appId: string }
  | { type: "move"; appId: string; x: number; y: number };

function reducer(state: ManagerState, action: Action): ManagerState {
  const win = state.windows[action.appId];

  switch (action.type) {
    case "open": {
      if (win) {
        // Already open: restore and bring to front.
        return {
          ...state,
          nextZ: state.nextZ + 1,
          windows: {
            ...state.windows,
            [action.appId]: { ...win, minimized: false, z: state.nextZ },
          },
        };
      }
      return {
        nextZ: state.nextZ + 1,
        order: [...state.order, action.appId],
        windows: {
          ...state.windows,
          [action.appId]: {
            appId: action.appId,
            x: action.x,
            y: action.y,
            z: state.nextZ,
            minimized: false,
          },
        },
      };
    }
    case "close": {
      if (!win) return state;
      const windows = { ...state.windows };
      delete windows[action.appId];
      return {
        ...state,
        windows,
        order: state.order.filter((id) => id !== action.appId),
      };
    }
    case "focus": {
      if (!win || win.z === state.nextZ - 1) return state;
      return {
        ...state,
        nextZ: state.nextZ + 1,
        windows: {
          ...state.windows,
          [action.appId]: { ...win, minimized: false, z: state.nextZ },
        },
      };
    }
    case "minimize": {
      if (!win) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.appId]: { ...win, minimized: true },
        },
      };
    }
    case "move": {
      if (!win) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.appId]: { ...win, x: action.x, y: action.y },
        },
      };
    }
  }
}

export function useWindowManager() {
  const [state, dispatch] = useReducer(reducer, {
    windows: {},
    order: [],
    nextZ: 1,
  });

  const open = useCallback(
    (appId: string, x: number, y: number) => dispatch({ type: "open", appId, x, y }),
    [],
  );

  const close = useCallback((appId: string) => dispatch({ type: "close", appId }), []);
  const focus = useCallback((appId: string) => dispatch({ type: "focus", appId }), []);
  const minimize = useCallback(
    (appId: string) => dispatch({ type: "minimize", appId }),
    [],
  );
  const move = useCallback(
    (appId: string, x: number, y: number) => dispatch({ type: "move", appId, x, y }),
    [],
  );

  const topWindowId =
    Object.values(state.windows)
      .filter((w) => !w.minimized)
      .sort((a, b) => b.z - a.z)[0]?.appId ?? null;

  return { windows: state.windows, topWindowId, open, close, focus, minimize, move };
}
