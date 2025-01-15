import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard";
export const metadata = {
  title:
    `Alani Admin Panel | ${process.env.SITE_NAME}`,
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Admin() {
  return (
    <>
      <DefaultLayout>
        {/* <Dashboard /> */}
        <div>Hello there, no dashboard for now</div>
      </DefaultLayout>
    </>
  );
}