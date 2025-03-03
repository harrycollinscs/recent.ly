import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dbConnect from "./mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI ?? '');

// export async function connectToDatabase() {
//     if (!client.isConnected()) {
//         await client.connect();
//     }
//     return client.db("testdb");
// }

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
      name: {
        type: "string",
        required: false,
        input: true,
      },
      username: {
        type: "string",
        required: true,
        input: true,
      },
      // email: {
      //   type: "string",
      //   required: true,
      //   input: true,
      // },
      // password: {
      //   type: "string",
      //   required: true,
      //   input: true,
      // },
      following: {
        type: ["string"],
        required: true,
        defaultValue: [],
        input: true,
      },
    },
  },
});
