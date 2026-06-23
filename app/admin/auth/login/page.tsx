"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <main className="grid h-dvh lg:grid-cols-2">
      {/* Left Panel - Branding with Gradient */}
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white lg:flex">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative z-10 flex h-full w-full flex-col justify-between p-14">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <BookOpen className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Bookstore CMS</h2>
              <p className="text-sm text-slate-400">Administration Panel</p>
            </div>
          </div>

          <div className="max-w-lg space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300 backdrop-blur-sm">
              Welcome Back
            </div>

            <h1 className="text-5xl font-bold leading-tight">Admin Panel</h1>

            <p className="text-lg leading-8 text-slate-300">
              Track inventory, manage orders, organize books, publications,
              teachers and customers from one beautifully designed dashboard.
            </p>
          </div>

        </div>
      </section>

      {/* Right Panel - Login Form with Gradient */}
      <section className="flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Card className="w-full max-w-md rounded-3xl border-0 shadow-2xl">
          <CardContent className="p-10">
            <div className="mb-10 space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome Back
              </h2>
              <p className="text-muted-foreground">
                Sign in to continue managing your bookstore.
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input
                  placeholder="admin@example.com"
                  type="email"
                  className="h-12 rounded-xl border-border/60 bg-muted/30"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Password</Label>
                <Input
                  placeholder="••••••••"
                  type="password"
                  className="h-12 rounded-xl border-border/60 bg-muted/30"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="cursor-pointer text-sm text-muted-foreground"
                  >
                    Remember me
                  </Label>
                </div>

                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button className="h-12 w-full rounded-xl text-base">
                Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <div className="mt-10 border-t border-border/60 pt-6 text-center text-sm text-muted-foreground">
              Bookstore CMS v1.0
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
