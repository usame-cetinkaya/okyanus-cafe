import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.tsx";
import { pb } from "@/lib/pocketbase";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(username, password);
      console.log({ authData });
      console.log({ authStore: pb.authStore });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    pb.authStore.clear();
    console.log("Logged out");
  };

  const getUsers = async () => {
    try {
      const users = await pb.collection("users").getFullList();
      console.log({ users });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center max-w-xs mx-auto">
      <Input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={getUsers}>Get Users</Button>
    </div>
  );
}

export default App;
