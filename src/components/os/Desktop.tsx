import { useCallback, useEffect } from "react";
import { APPS, getApp } from "../../os/registry";
import { useWindowManager } from "../../os/windowManager";
import { content } from "../../content";
import { GlowBackdrop } from "../ui/GlowBackdrop";
import { BootScreen } from "./BootScreen";
import { MenuBar } from "./MenuBar";
import { Window } from "./Window";
import { Dock } from "./Dock";
import { DesktopIcon } from "./DesktopIcon";
import { OpenAppContext } from "../../os/OpenAppContext";
import "./Desktop.css";

const CASCADE_STEP = 28;

export function Desktop() {
  const { windows, topWindowId, open, close, focus, minimize, move } =
    useWindowManager();

  const openApp = useCallback(
    (appId: string) => {
      const app = getApp(appId);
      if (!app) return;
      const cascade = (Object.keys(windows).length % 4) * CASCADE_STEP;
      const x = Math.max(
        12,
        Math.min(
          app.baseX * window.innerWidth + cascade,
          window.innerWidth - Math.min(app.width, window.innerWidth - 24) - 12,
        ),
      );
      const y = Math.max(
        48,
        Math.min(app.baseY * window.innerHeight + cascade + 40, window.innerHeight - 220),
      );
      open(appId, x, y);
    },
    [windows, open],
  );

  // Greet first-time visitors with the Welcome window.
  useEffect(() => {
    openApp("welcome");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDockClick = (appId: string) => {
    const win = windows[appId];
    if (win && !win.minimized && appId === topWindowId) {
      minimize(appId);
    } else {
      openApp(appId);
    }
  };

  const activeTitle = topWindowId ? (getApp(topWindowId)?.title ?? null) : null;

  return (
    <OpenAppContext.Provider value={openApp}>
      <div className="desktop">
        <GlowBackdrop />
        <MenuBar activeTitle={activeTitle} />

        <div className="desktop__icons">
          {APPS.filter((app) => app.onDesktop).map((app) => (
            <DesktopIcon
              key={app.id}
              label={app.title}
              icon={app.icon}
              onOpen={() => openApp(app.id)}
            />
          ))}
        </div>

        <div className="desktop__wallpaper-signature" aria-hidden>
          <span className="desktop__signature-name">{content.hero.name}</span>
          <span className="desktop__signature-role">{content.hero.headline}</span>
        </div>

        {Object.values(windows)
          .filter((win) => !win.minimized)
          .map((win) => {
            const app = getApp(win.appId);
            if (!app) return null;
            const AppComponent = app.component;
            return (
              <Window
                key={win.appId}
                title={app.title}
                x={win.x}
                y={win.y}
                z={win.z}
                width={app.width}
                height={app.height}
                isTop={win.appId === topWindowId}
                onClose={() => close(win.appId)}
                onMinimize={() => minimize(win.appId)}
                onFocus={() => focus(win.appId)}
                onMove={(x, y) => move(win.appId, x, y)}
              >
                <AppComponent />
              </Window>
            );
          })}

        <Dock
          openWindows={windows}
          topWindowId={topWindowId}
          onAppClick={handleDockClick}
        />
        <BootScreen />
      </div>
    </OpenAppContext.Provider>
  );
}
