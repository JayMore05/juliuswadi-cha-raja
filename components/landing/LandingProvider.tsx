"use client";

import { ReactNode } from "react";
import { usePublicSettings } from "@/hooks/usePublicSettings";

interface Props {
  children: (
    settings: ReturnType<typeof usePublicSettings>["settings"]
  ) => ReactNode;
}

export default function LandingProvider({
  children,
}: Props) {
  const { settings } = usePublicSettings();

  return <>{children(settings)}</>;
}