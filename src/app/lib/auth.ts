import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dbConnect from "./mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI ?? '');

client.connect();
export const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "users",
    additionalFields: {
      username: {
        type: "string",
        required: true,
        input: true,
      },
      following: {
        type: ["string"],
        required: true,
        defaultValue: [],
      },
    },
  },
});
