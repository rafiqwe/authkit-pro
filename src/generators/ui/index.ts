import { Provider } from "../../types/config.js";
import { write } from "../../utils/write.js";
import { credentialsForm } from "./credentialForm.js";
import { loginPage } from "./loginPage.js";
import { providerButtons } from "./providerButtons.js";
import { sessionHelper } from "./sessionHelper.js";
import { userProfile } from "./userProfile.js";
import { signOutButton } from "./signOutButton.js";

export function generateUI(targetDir: string, providers: Provider[]) {
  if (providers.includes("credentials")) {
    write(targetDir, "components/auth/CredentialsForm.tsx", credentialsForm());
  }else{
    
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
