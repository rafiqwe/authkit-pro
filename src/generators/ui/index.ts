import { Engine, Provider } from "../../types/config.js";
import { write } from "../../utils/write.js";
import { credentialsForm } from "./credentialForm.js";
import { loginPage } from "./loginPage.js";
import { providerButtons } from "./providerButtons.js";
import { sessionHelper } from "./sessionHelper.js";
import { userProfile } from "./userProfile.js";
import { signOutButton } from "./signOutButton.js";
import { ProfilePage } from "./profilePage.js";

interface UIConfig {
  providers: Provider[];
  engine: Engine;
}

export function generateUI(targetDir: string, config: UIConfig) {
  if (config.providers.includes("credentials")) {
    write(targetDir, "components/auth/CredentialsForm.tsx", credentialsForm());
  } else {
  }
  write(
    targetDir,
    "app/login/page.tsx",
    loginPage(config.providers, config.engine),
  );
  write(targetDir, 'app/profile/page.tsx', ProfilePage(config.engine))
  write(
    targetDir,
    "components/auth/ProviderButtons.tsx",
    providerButtons(config.providers),
  );
  write(targetDir, "components/auth/SignOutButton.tsx", signOutButton(config.engine));
  write(targetDir, "components/auth/UserProfile.tsx", userProfile());
  write(targetDir, "lib/session.ts", sessionHelper(config.engine));
}
