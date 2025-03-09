import { authClient } from "@app/lib/auth-client";

const handleSignOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/signin";
      },
    },
  });
};

export default handleSignOut
