import { Engine, Provider } from "../../types/config.js";

export function loginPage(providers: Provider[], engine: Engine) {
  const imports =
    engine === "nextauth"
      ? "import { getServerSession } from 'next-auth';\nimport { authOptions } from '@/lib/auth';"
      : "import { auth } from '@/lib/auth';";

  const OAuth = `
import { ProviderButtons } from "@/components/auth/ProviderButtons";
${imports}

export const dynamic = "force-dynamic";

export default async function LoginPage() {
    const session = await ${
      engine === "nextauth" ? "getServerSession(authOptions);" : "auth();"
    };

  if (session) redirect("/");

  const bgImageUrl =
    "https://img.freepik.com/free-vector/beautiful-white-cloud-blue-sky-background_1035-23406.jpg";

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: \`url('\${bgImageUrl}\')\` }}
    >
      {/* Soft dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="p-10 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-xl border border-white/30">
          {/* Branding */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Authkit Pro
            </h1>
            <p className="text-sm text-gray-600">
              Secure authentication starter for modern apps
            </p>
          </div>

          {/* Providers */}
          <ProviderButtons />

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
    `;

  const Credential = `
import { ProviderButtons } from "@/components/auth/ProviderButtons";
${imports}
import { redirect } from "next/navigation";
import CredentialsForm from "@/components/auth/CredentialsForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await ${
    engine === "nextauth" ? "getServerSession(authOptions)" : "auth()"
  };

  if (session) redirect("/");

  const bgImageUrl =
    "https://img.freepik.com/free-vector/beautiful-white-cloud-blue-sky-background_1035-23406.jpg";

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: \`url('\${bgImageUrl}')\` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="p-10 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-xl border border-white/30">

          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Authkit Pro
            </h1>
            <p className="text-sm text-gray-600">
              Secure authentication starter for modern applications
            </p>
          </div>

          {/* Credentials Form */}
          <CredentialsForm />

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* OAuth Providers */}
          <ProviderButtons />

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
`;

  if (providers.includes("credentials")) {
    return Credential;
  } else {
    return OAuth;
  }
}
