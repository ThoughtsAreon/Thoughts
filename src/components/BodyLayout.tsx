import classnames from "classnames";
import React, { ReactNode } from "react";

export function BodyLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className={classnames("flex flex-row h-screen w-full", className)}>
        {children}
      </div>
    </>
  );
}
