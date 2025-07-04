// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

// ℹ️ Needed to accept requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request is made from the same domain, by default express wont accept POST requests
const cors = require("cors");

// const session = require('express-session');
// const MongoStore = require('connect-mongo');

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

// Middleware configuration
module.exports = (app) => {

  // Because this will be hosted on a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like Fly use something called a proxy and you need to add this to your server
  app.set("trust proxy", 1);

  // controls a very specific header to pass headers from the frontend
  app.use(
    cors({
      origin: [FRONTEND_URL],
    })
  );

  // This is the most permissive CORS configuration, allowing all origins and credentials.
  // This is useful for development but should be restricted in production.  
  // app.use(
  //   cors({
  //     origin: true,
  //     credentials: true,
  //   })
  // );

  // app.use(
  //   cors(true)
  // );

  // app.use(
  //   session({
  //       secret: "canBeAnything",
  //       resave: true,
  //       saveUninitialized: false,
  //       cookie: {
  //       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  //       secure: process.env.NODE_ENV === 'production',
  //       httpOnly: true,
  //       maxAge: 600000
  //       }, // ADDED code below !!!
  //       store: MongoStore.create({
  //       mongoUrl: process.env.MONGODB_URI
    
  //       // ttl => time to live
  //       // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
  //       })
  //   })
  // );


  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
