import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
};

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextAuth(req, res, authOptions);
  return res;
};

const handlers = {
  GET: auth,
  POST: auth,
};

export { auth, handlers };
