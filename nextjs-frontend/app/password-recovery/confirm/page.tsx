"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { passwordResetConfirm } from "@/components/actions/password-reset-action";
import { SubmitButton } from "@/components/ui/submitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const initialState = { message: "" };

export default function Page() {
  const [state, dispatch] = useActionState(passwordResetConfirm, initialState);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <form action={dispatch}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Reset your Password</CardTitle>
            <CardDescription>
              Enter the new password and confirm it.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwordConfirm">Password Confirm</Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
              />
            </div>
            <input
              type="hidden"
              id="resetToken"
              name="resetToken"
              value={token}
              readOnly
            />
            <SubmitButton text={"Send"} />
            {state?.message && (
              <p className="text-green-600">{state.message}</p>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
