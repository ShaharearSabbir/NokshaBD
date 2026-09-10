import app from "./app.js";
import { env } from "./config/index.js";

app.listen(env?.PORT, () => {
  console.log(`NokhshaBD is running on http://localhost:${env?.PORT}`);
});
