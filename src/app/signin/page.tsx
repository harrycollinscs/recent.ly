"use client";
import CTA from "@app/components/atoms/CTA";
import { authClient } from "@app/lib/auth-client";
import { FormEvent, useState } from "react";
import { BarLoader } from "react-spinners";
import "./SignIn.styles.scss";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

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
        followerCount: 0,
        followingCount: 0,
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          setIsLoading(false);
          window.location.href = "/";

          // redirect("/");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
  };

  const handleSignIn = async (email: string, password: string) => {
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
        rememberMe: false,
      },
      {
        onRequest: (ctx) => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          setIsLoading(false);
          window.location.href = "/";
        },
        onError: (ctx) => {
          console.log(ctx.error);
          alert(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLTextAreaElement;

    if (isSignUp) {
      handleSignUp(
        target?.[0]?.value,
        target?.[1]?.value,
        target?.[2]?.value,
        target?.[3]?.value
      );
    } else {
      handleSignIn(target?.[0]?.value, target?.[1]?.value);
    }
  };

  return (
    <div className="container">
      <div className="sign-up-container">
        <h1>Sign {isSignUp ? "up" : "in"}</h1>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div>
                <label title="Name" />
                <input type="text" required id="name" placeholder="Name" />
              </div>

              <div>
                <label title="Username" />
                <input
                  type="text"
                  required
                  id="username"
                  placeholder="Username"
                />
              </div>
            </>
          )}

          <div>
            <label title="Email" />
            <input type="text" required id="email" placeholder="Email" />
          </div>

          <div>
            <label title="Password" />
            <input
              type="password"
              placeholder="Password"
              id="password"
              required
            />
          </div>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                height: "2em",
              }}
            >
              <BarLoader color="#fff" />
            </div>
          ) : (
            <CTA type="submit" text={"Submit"} />
          )}
        </form>

        <div>
          {isSignUp ? (
            <>
              <p>If you have an account, </p>
              <a onClick={() => setIsSignUp(false)}>Sign in</a>
            </>
          ) : (
            <>
              <p>If you don't have an account, </p>
              <a onClick={() => setIsSignUp(true)}>Sign up</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
