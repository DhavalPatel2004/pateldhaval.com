import { useState, type ReactNode } from "react";
import "./Tabs.css";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
}

export function Tabs({ items }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={item.id === activeId}
            aria-controls={`panel-${item.id}`}
            className={`tabs__tab${item.id === activeId ? " is-active" : ""}`}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="tabs__panel"
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
      >
        {active.content}
      </div>
    </div>
  );
}
