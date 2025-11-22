import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.tsx";
import { pb } from "@/lib/pocketbase";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isAdminLogin = window.location.pathname === "/yonetim";

  const handleLogin = async () => {
    try {
      setLoading(true);
      await pb
        .collection(isAdminLogin ? "_superusers" : "users")
        .authWithPassword(username + "@okyanus.cafe", password);
      window.location.href = "/";
    } catch {
      alert("Hatalı kullanıcı adı veya şifre.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="flex h-14 items-center justify-center gap-4 border-b bg-muted/40 px-4">
        <h1 className="text-xl">
          Okyanus Cafe{isAdminLogin ? " Yönetim" : ""}
        </h1>
      </header>
      <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-6">
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
        <Button onClick={handleLogin} disabled={loading}>
          Giriş Yap
        </Button>
      </div>
    </>
  );
}

export default Login;
