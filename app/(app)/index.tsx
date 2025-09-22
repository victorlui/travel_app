import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/(app)/intro");
  }, [router]);

  return null;
}
