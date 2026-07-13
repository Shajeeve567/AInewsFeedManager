import { DashboardNav } from "@/components/dashboard/nav";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardNav />
      <main>{children}</main>
    </AuthGuard>
  );
}
