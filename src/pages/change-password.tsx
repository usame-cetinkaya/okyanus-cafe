import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.tsx";
import { pb } from "@/lib/pocketbase";
import * as React from "react";

function ChangePassword() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const oldPassword = import.meta.env.VITE_DEFAULT_PASSWORD;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    try {
      setLoading(true);

      await pb.collection("users").update(pb.authStore.record?.id as string, {
        oldPassword,
        password,
        passwordConfirm,
        must_change_password: false,
      });

      await pb
        .collection("users")
        .authWithPassword(pb.authStore.record?.email as string, password);

      window.location.href = "/";
    } catch {
      alert(`Bir hata oluştu.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-6">
          <p>
            Yeni bir şifre belirlemeniz gerekmektedir.
            <br />
            Şifreniz en az 8 karakter uzunluğunda olmalıdır.
          </p>
          <Input
            type="password"
            name="password"
            placeholder="Şifre"
            minLength={8}
            required
          />
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Şifre (tekrar)"
            minLength={8}
            required
          />
          <Button type="submit" disabled={loading}>
            Şifreyi Değiştir ve Giriş Yap
          </Button>
        </div>
      </form>
    </>
  );
}

export default ChangePassword;
