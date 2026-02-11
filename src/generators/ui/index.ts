import { Provider } from "../../types/config.js";
import { write } from "../../utils/write.js";

export function generateUI(targetDir: string, providers: Provider[]) {
  function signOutButton() {
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

  function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function providerButtons(providers: Provider[]) {
    const buttons = providers
      .map(
        (p) => `
<button
  onClick={() => signIn("${p}")}
  className="w-full mb-2 px-4 py-2 border rounded"
>
  Continue with ${capitalize(p)}
</button>
`,
      )
      .join("");

    return `
"use client";

import { signIn } from "next-auth/react";

export function ProviderButtons() {
  return (
    <div>
      ${buttons}
    </div>
  );
}
`;
  }

  function loginPage(providers: Provider[]) {
    return `
import { ProviderButtons } from "@/components/auth/ProviderButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 border rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <ProviderButtons />
      </div>
    </div>
  );
}
`;
  }

  function userProfile() {
    return `
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export function UserProfile() {
  const { data } = useSession();

  if (!data) return null;

  return (
    <div className="flex items-center gap-3">
      {data.user?.image && (
        <Image
          src={data.user.image}
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <div>
        <p>{data.user?.name}</p>
        <p className="text-sm opacity-70">{data.user?.email}</p>
      </div>
    </div>
  );
}
`;
  }

  function sessionHelper() {
    return `
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const getSession = () => getServerSession(authOptions);
`;
  }

  write(targetDir, "app/login/page.tsx", loginPage(providers));
  write(
    targetDir,
    "components/auth/ProviderButtons.tsx",
    providerButtons(providers),
  );
  write(targetDir, "components/auth/SignOutButton.tsx", signOutButton());
  write(targetDir, "components/auth/UserProfile.tsx", userProfile());
  write(targetDir, "lib/session.ts", sessionHelper());
}
