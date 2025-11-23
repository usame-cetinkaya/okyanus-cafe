import AdminLayout from "@/components/admin-layout.tsx";
import UserLayout from "@/components/user-layout.tsx";
import { route, navItems } from "@/lib/nav.ts";
import { pb } from "@/lib/pocketbase";
import Login from "@/pages/login.tsx";
import NotFound from "@/pages/not-found.tsx";
import UserDashboard from "@/pages/user-dashboard.tsx";
import ChangePassword from "@/pages/change-password.tsx";

function App() {
  if (!pb.authStore.isValid) {
    return <Login />;
  }

  if (!pb.authStore.isSuperuser) {
    if (pb.authStore.record?.must_change_password) {
      return (
        <UserLayout>
          <ChangePassword />
        </UserLayout>
      );
    }

    return (
      <UserLayout>
        <UserDashboard />
      </UserLayout>
    );
  }

  const pathname = route();

  const Component =
    navItems.find((item) => item.pathname === pathname)?.component || NotFound;

  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
}

export default App;
