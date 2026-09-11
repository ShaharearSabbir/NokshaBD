import app from "./app.js";
import { env } from "./config/index.js";

const server = app.listen(env?.PORT, () => {
  console.log(`NokhshaBD is running on http://localhost:${env?.PORT}`);
});

const shutdown = (signal: string) => {
  console.log(`${signal} received, shutting down gracefully...`);
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));