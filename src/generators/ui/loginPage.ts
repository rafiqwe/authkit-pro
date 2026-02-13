import { Provider } from "../../types/config.js";

export function loginPage(providers: Provider[]) {
  const OAuth = `
import { ProviderButtons } from "@/components/auth/ProviderButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const bgImageUrl =
    "https://img.freepik.com/free-vector/beautiful-white-cloud-blue-sky-background_1035-23406.jpg";

  if (session) redirect("/");

  return (
    <div
      className={\`flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat\`}
      style={{ backgroundImage: \`url('\${bgImageUrl}')\` }}
    >
      {/* Added backdrop-blur and semi-transparent bg for a "Glass" effect */}
      <div className="p-10 border  border-white/20 rounded-2xl shadow-2xl bg-white/70 backdrop-blur-md w-full max-w-md mx-4 bg-gradient-to-t to-cyan-200 from-gray-50">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Authkit-pro
          </h1>
          <p className="text-sm text-gray-700">
            Sign in to your account to continue
          </p>
        </div>
        <ProviderButtons />
        <p className="mt-6 text-center text-xs text-gray-800">
          By signing in, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}

    `;
  const Credential = `
import { ProviderButtons } from "@/components/auth/ProviderButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CredentialsForm from "@/components/auth/CredentialsForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const bgImageUrl =
    "https://img.freepik.com/free-vector/beautiful-white-cloud-blue-sky-background_1035-23406.jpg";

  if (session) redirect("/");

  return (
    <div
      className={\`flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat\`}
      style={{ backgroundImage: \`url('\${bgImageUrl}')\` }}
    >
      {/* Added backdrop-blur and semi-transparent bg for a "Glass" effect */}
      <div className="p-10 border  border-white/20 rounded-2xl shadow-2xl bg-white/70 backdrop-blur-md w-full max-w-md mx-4 bg-gradient-to-t to-cyan-200 from-gray-50">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Authkit-pro
          </h1>
          <p className="text-sm text-gray-700">
            Sign in to your account to continue
          </p>
        </div>
        <CredentialsForm />
        <div className="flex items-center justify-center gap-2 w-full mt-2">
          <div className="w-full h-px bg-gray-400"></div>
          <p className="text-gray-400 whitespace-nowrap">or sign with</p>
          <div className="w-full h-px bg-gray-400"></div>
        </div>
        <div className="mt-2 w-full h-full">
          <ProviderButtons />
        </div>
        <p className="mt-6 text-center text-xs text-gray-800">
          By signing in, you agree to our Terms of Service.
        </p>
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
