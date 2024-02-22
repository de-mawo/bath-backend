
require('dotenv').config() // Add this otherwise .env variables wont read
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import passport from "./utils/passport";
import redisStore from "./utils/redis";
import session from "express-session";
import cors from "cors";
import { __prod__ } from "./utils/constants";

const app = express();
const port = process.env.PORT;

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
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

// ROUTES
app.use("/auth", authRoutes);


app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});