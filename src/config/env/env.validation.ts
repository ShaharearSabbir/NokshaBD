import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number("Please add PORT on env"),
  NODE_ENV: z.string("Please add NODE_ENV on env"),
});
