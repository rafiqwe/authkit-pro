export function userProfile() {
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