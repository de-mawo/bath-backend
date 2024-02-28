
require('dotenv').config() // Add this otherwise .env variables wont read
import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cors from "cors";
import authRoutes from "./routes/auth";
import courseRoutes from "./routes/course";
import moduleRoutes from "./routes/module";
import projectRoutes from "./routes/project";
import marksRoutes from "./routes/marks";
import taskRoutes from "./routes/task";
import eventRoutes from "./routes/event";
import userRoutes from "./routes/user";
import passport from "./utils/passport";
import redisStore from "./utils/redis";
import session from "express-session";
import { __prod__ } from "./utils/constants";

const app = express();
const port = process.env.PORT;

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);



// Initialize session storage.
app.use(
  session({
    name: "spana_sess",
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: process.env.SESSION_SECRET as string,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, //30 Days
      httpOnly: true,
      sameSite: "lax", //csrf
      secure: __prod__,
    },
  })
);

app.use(passport.initialize());  // init passport on every route call.
app.use(passport.session())  // allow passport to use "express-session".

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



// ROUTES
app.use("/auth", authRoutes);
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/module", moduleRoutes)
app.use("/api/v1/project", projectRoutes)
app.use("/api/v1/marks", marksRoutes)
app.use("/api/v1/task", taskRoutes)
app.use("/api/v1/event", eventRoutes)
app.use("/api/v1/user", userRoutes)


app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});