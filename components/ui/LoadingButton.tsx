"use client";

import Button from "./Button";

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
    <Button loading={loading} {...props}>
      {children}
    </Button>
  );
}