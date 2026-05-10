"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate real auth
    console.log("login", { email });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 border border-border bg-card">
        <h1 className="text-2xl font-bold text-foreground mb-2">Sign in to CampusConnect</h1>
        <p className="text-sm text-muted-foreground mb-6">Welcome back — please enter your details.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@school.edu" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit" className="bg-primary hover:bg-primary/80 text-primary-foreground">Sign in</Button>
            <Link href="/auth/signup" className="text-sm text-primary hover:underline">Create account</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
