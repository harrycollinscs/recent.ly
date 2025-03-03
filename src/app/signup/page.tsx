"use client";
import { authClient } from "@app/lib/auth-client";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("TEST1@gmail.com");
  const [password, setPassword] = useState("@Test");
  const [name, setName] = useState("TEST1 Collins");
  const [username, setUsername] = useState("TEST1");
  const [image, setImage] = useState("");

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  console.log({
    session,
    isPending,
    error,
    refetch,
  });

  const handleSignUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        username,
        image, // user image url (optional)
        following: [],
        callbackURL: "/dashboard", // a url to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );

    console.log({
      data,
      error,
    });
  };

  return <button onClick={handleSignUp}>Hey</button>;
};

export default SignUp;
