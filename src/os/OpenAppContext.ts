import { createContext, useContext } from "react";

// Lets any app open another app (e.g. Welcome's "View projects" button,
// terminal `open` command) without prop-drilling through the window tree.
export const OpenAppContext = createContext<(appId: string) => void>(() => {});

export const useOpenApp = () => useContext(OpenAppContext);
