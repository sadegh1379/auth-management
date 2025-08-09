"use client"

import { LOCALSTORAGE_KEYS } from "@/enums/localstorage-keys";
import { ROUTES_DASHBOARD } from "@/enums/routes";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const [userData, _] = useLocalStorage<ApiTypes.userData | "">(
    LOCALSTORAGE_KEYS.ME,
    ""
  );

  useLayoutEffect(() => {
    if (userData && typeof userData === "object") {
      router.replace(ROUTES_DASHBOARD.BASE);
    }
  }, [userData, router]);

  return children
}
