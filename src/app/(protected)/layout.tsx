"use client"

import { LOCALSTORAGE_KEYS } from "@/enums/localstorage-keys";
import { ROUTES_AUTH } from "@/enums/routes";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [userData, _] = useLocalStorage<ApiTypes.userData | "">(
    LOCALSTORAGE_KEYS.ME,
    ""
  );

  useLayoutEffect(() => {
    if (!userData || typeof userData !== "object") {
      router.replace(ROUTES_AUTH.BASE);
    }
  }, [userData, router]);

  return children;
}
