import { Provider } from "../../types/config.js";

type ProviderIcons = {
  name: Provider;
  import: string;
  icon: string;
};

export function providerButtons(providers: Provider[]) {
  const providerIcons: ProviderIcons[] = [
    {
      name: "google",
      import: `import { FcGoogle } from "react-icons/fc";`,
      icon: "FcGoogle",
    },
    {
      name: "github",
      import: `import { FaGithub } from "react-icons/fa";`,
      icon: "FaGithub",
    },
    {
      name: "facebook",
      import: `import { FaFacebook } from "react-icons/fa";`,
      icon: "FaFacebook",
    },
  ];

  // Match only selected providers
  const selectedProviders = providerIcons.filter((icon) =>
    providers.includes(icon.name),
  );

  const iconImports = selectedProviders.map((p) => p.import).join("\n");

  const buttons = selectedProviders
    .map((p) => {
      return `
      <button
        key="${p.name}"
        disabled={!!loadingProvider}
        onClick={() => handleSignIn("${p.name}")}
        className="w-full mb-2 px-4 py-2.5 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] bg-white rounded-xl 
        text-gray-800 font-medium flex items-center justify-center gap-3 
        hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 
        disabled:opacity-70 disabled:cursor-not-allowed shadow-sm cursor-pointer"
      >
        {loadingProvider === "${p.name}"  ? (
          <RiLoader2Line className="w-5 h-5 animate-spin text-gray-500" />
        ) : (
          <>
            <${p.icon} size={20} />
            ${providers.includes("credentials") ? `` : `<span>Continue with ${p.name}</span>`}
          </>
        )}
      </button>
`;
    })
    .join("\n");

  return `
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { RiLoader2Line } from "react-icons/ri";
${iconImports}

export function ProviderButtons() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    setLoadingProvider(provider);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error("Login failed:", error);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="w-full ${providers.includes("credentials") ? "flex items-center justify-center gap-3" : ""} ">
      ${buttons}
    </div>
  );
}
`;
}
