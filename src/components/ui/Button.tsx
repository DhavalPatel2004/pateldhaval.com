import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type Variant = "solid" | "outline";

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ variant = "solid", children, ...rest }: ButtonProps) {
  const className = `btn btn--${variant}`;

  if (rest.href !== undefined) {
    return (
      <a className={className} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
