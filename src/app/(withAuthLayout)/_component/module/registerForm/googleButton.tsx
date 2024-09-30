import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  return (
    <Button
      className="font-semibold"
      startContent={<FcGoogle size={20} />}
      variant="bordered"
      radius="full"
      color="default"
      fullWidth
      onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}
    >
      Log in with Google
    </Button>
  );
}
