"use client";
import { authClient } from "@app/lib/auth-client";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const { data: session, isPending, error, refetch } = authClient.useSession();

  console.log({
    session,
    isPending,
    error,
    refetch,
  });

  const handleSignUp = async (event: Event) => {
    event.preventDefault();

    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        username,
        image: "", // user image url (optional)
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

  const inputStyle = {
    height: "3em",
    padding: "1em",
    marginBottom: "2em",
    width: "100%",
  };

  const buttonStyle = {
    width: "100%",
    height: "3em",
    border: '1px solid white',
    borderRadisu: '1em'
  };

  return (
    <div
      style={{
        height: "50vh",
        width: "24em",
        borderRadius: 20,
        background: "black",
        textAlign: "center",
        alignContent: "center",
        padding: "4em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{}}>Sign in</h1>

      <form className="inputs-form">
        <div className="field">
          <label title="Name" />
          <input
            type="text"
            required
            id="name"
            // value={name}
            onChange={(e) => console.log(e)}
            style={inputStyle}
          />
        </div>

        <div className="field">
          <label title="Password" />
          <input type="password" required id="password" style={inputStyle} />
        </div>

        <input type="submit" style={buttonStyle} />
      </form>
    </div>
  );
};

export default SignUp;
