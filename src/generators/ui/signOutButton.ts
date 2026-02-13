export function signOutButton() {
    return `
"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 border rounded"
    >
      Sign Out
    </button>
  );
}
`;
  }