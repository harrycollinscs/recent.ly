"use client";
import { authClient } from "@app/lib/auth-client";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { BarLoader, MoonLoader } from "react-spinners";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const inputStyle = {
    height: "3em",
    padding: "1em",
    marginBottom: "2em",
    width: "100%",
  };

  const buttonStyle = {
    width: "100%",
    height: "3em",
    border: "1px solid white",
    borderRadisu: "1em",
  };

  const handleSignUp = async (
    name: string,
    username: string,
    email: string,
    password: string
  ) => {
    await authClient.signUp.email(
      {
        name,
        username,
        email,
        password,
        image: "",
        following: [],
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          setIsLoading(false);
          redirect("/");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLTextAreaElement;

    handleSignUp(
      target?.[0]?.value,
      target?.[1]?.value,
      target?.[2]?.value,
      target?.[3]?.value
    );
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          height: "50vh",
          width: "24em",
          borderRadius: 20,
          background: "black",
          textAlign: "center",
          alignContent: "center",
          alignSelf: "center",
          padding: "4em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h1>Sign in</h1>

        <form className="inputs-form" onSubmit={handleSubmit}>
          <div>
            <label title="Name" />
            <input
              type="text"
              required
              id="name"
              placeholder="Name"
              style={inputStyle}
            />
          </div>

          <div>
            <label title="Username" />
            <input
              type="text"
              required
              id="username"
              placeholder="Username"
              style={inputStyle}
            />
          </div>

          <div>
            <label title="Email" />
            <input
              type="text"
              required
              id="email"
              placeholder="Email"
              style={inputStyle}
            />
          </div>

          <div className="field">
            <label title="Password" />
            <input
              type="password"
              placeholder="Password"
              id="password"
              required
              style={inputStyle}
            />
          </div>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                width: '100%',
                justifyContent: "center",
                height: "2em",
              }}
            >
              <BarLoader color="#fff" />
            </div>
          ) : (
            <input type="submit" style={buttonStyle} />
          )}
        </form>
      </div>
    </main>
  );
};

export default SignUp;
