"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/api/authService";

const RedirectTemplate = () => {
  return (
    <>
      <h2 className="text-3xl font-serif mb-6 text-center">
        We have sent you an Email.Please check
      </h2>
    </>
  );
};

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await authService.emailSend({ email });
    if (res.data.success) {
      setIsClicked(true);
    } else {
      //throw error
    }
  };

  return (
    <>
      {!isClicked && (
        <div>
          <h2 className="text-3xl font-serif mb-6 text-center">
            Enter email to send verification link
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Verify Email
            </Button>
          </form>
        </div>
      )}

      {isClicked && <RedirectTemplate />}
    </>
  );
}
