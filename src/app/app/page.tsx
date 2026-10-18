import type { Metadata } from "next";
import { ActivityApp } from "@/components/activity/activity-app";
export const metadata: Metadata = { title: "Mulai kegiatan" };
export default async function AppPage({ searchParams }: { searchParams: Promise<{ minutes?: string }> }) {
  const { minutes } = await searchParams;
  const initialMinutes = minutes === "2" ? 2 : minutes === "5" ? 5 : minutes === "10" ? 10 : null;
  return <ActivityApp initialMinutes={initialMinutes} />;
}
