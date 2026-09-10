import * as dotenv from "dotenv";
import { envSchema } from "./env.validation.js";

dotenv.config();

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(
    `Please add ${parsed.error?.issues.map((i) => i.path).join(", ")} on environment variable`,
  );
}

export const env = parsed.data;
