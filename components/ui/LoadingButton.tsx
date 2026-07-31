"use client";

import { Button } from "./button";

interface Props {
  loading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function LoadingButton({
  loading,
  children,
  ...props
}: Props) {
  return (
    <Button disabled={loading} {...props}>
      {loading ? "Loading..." : children}
    </Button>
  );
}