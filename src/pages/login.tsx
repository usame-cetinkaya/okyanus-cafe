import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.tsx";
import { pb } from "@/lib/pocketbase";
import * as React from "react";

function Login() {
  const [loading, setLoading] = useState(false);

  const isAdminLogin = window.location.pathname === "/yonetim";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

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
      <form onSubmit={handleLogin}>
        <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-6">
          <Input
            type="text"
            name="username"
            placeholder="Kullanıcı Adı"
            required
          />
          <Input type="password" name="password" placeholder="Şifre" required />
          <Button type="submit" disabled={loading}>
            Giriş Yap
          </Button>
        </div>
      </form>
    </>
  );
}

export default Login;
