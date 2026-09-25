"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function Header({ className, children }: HeaderProps) {
  return <div className={cn("flex items-center gap-3 p-4 pb-2", className)}>{children}</div>;
}
