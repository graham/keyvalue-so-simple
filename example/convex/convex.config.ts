import { defineApp } from "convex/server";

import keyvalueSoSimple from "keyvalue-so-simple/convex.config";

const app = defineApp();
app.use(keyvalueSoSimple);

export default app;
