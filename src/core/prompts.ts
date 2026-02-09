import prompts from "prompts";

export type SetupAnswers = {
  google: boolean;
  credentials: boolean;
  middleware: boolean;
};

export async function askSetup(): Promise<SetupAnswers> {
  const response = await prompts([
    {
      type: "confirm",
      name: "google",
      message: "Enable Google OAuth?",
      initial: true,
    },
    {
      type: "confirm",
      name: "credentials",
      message: "Enable Credentials Login?",
      initial: true,
    },
    {
      type: "confirm",
      name: "middleware",
      message: "Add route protection middleware?",
      initial: true,
    },
  ]);

  return response as SetupAnswers;
}
