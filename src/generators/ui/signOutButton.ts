import { Engine } from "../../types/config.js";

export function signOutButton(engine: Engine) {
  const importAuth =
    engine === "authjs"
      ? 'import { signOut } from "@/lib/auth";'
      : 'import { signOut } from "next-auth/react";';

  return `
${importAuth}

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="bg-red-500 cursor-pointer hover:bg-red-600 transition-colors text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
      >
        Logout
      </button>
    </form>
  );
}

`;
}
