import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/api/authService";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(searchParams.get("token"));
  // const token = searchParams.get("token");
  console.log(decodeURIComponent(token as string));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: any = {
      token,
      newPassword,
      confirmPassword,
    };

    const res = await authService.resetPassword(data);
    if (res.data.success) {
      console.log(res);
    }
  };
  return (
    <>
      <h2 className="text-3xl font-serif mb-6 text-center">
        Enter email to send verification link
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
