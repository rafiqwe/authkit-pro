export function authSchema(provider: "postgres") {
  const datasource = `
datasource db {
  provider = "postgresql"
}

`;

  return `
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

${datasource}

model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  name          String?
  emailVerified DateTime?
  image         String?
  password      String?
  role          String?   @default("user")
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}
`;
}
