import { Engine } from "../../types/config.js";

export function ProfilePage(engine: Engine) {
  const imports =
    engine === "nextauth"
      ? "import { getServerSession } from 'next-auth';\nimport { authOptions } from '@/lib/auth'\nimport { signOut } from 'next-auth/react';"
      : "import { auth, signOut } from '@/lib/auth';";

  const file = `
  import Image from "next/image";
  ${imports}
  import { redirect } from "next/navigation";
  import { SignOutButton } from "@/components/auth/SignOutButton";
  export const dynamic = "force-dynamic";
  

export default async function ProfilePage() {
  const session = await ${
    engine === "nextauth" ? "getServerSession(authOptions);" : "auth();"
  };

  if (!session?.user) {
    redirect("/login");
  }
  const user = session.user;

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-50 to-cyan-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Profile
          </h1>
          <SignOutButton />
        </div>
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="relative w-32 h-32">
            <Image
              src={user.image || "/avatar-placeholder.png"}
              alt={user.name || "User Avatar"}
              fill
              loading="lazy"
              className="rounded-full object-cover border-4 border-cyan-200"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col text-center md:text-left gap-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name || "User"}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block mt-2 text-xs font-medium bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full">
              Authenticated User
            </span>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Welcome to Authkit Pro
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Your authentication system is successfully configured and running.
          </p>
        </div>
      </div>
    </div>
  );
}

    `;
  return file;
}
