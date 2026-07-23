import passport, { Passport } from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import prisma from "../database/prisma.js"



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const emailVerified = profile.emails?.[0]?.verified;

        if (!email) {
          return done(new Error("Google account has no email"), null);
        }

        // 1. Already linked by googleId — normal returning OAuth user
        let user = await prisma.user.findUnique({ where: { googleId: profile.id } });

        if (!user) {
            // Creating a new user
          // 2. Existing local account with same email — auto-link only if Google verified it
          user = await prisma.user.findUnique({ where: { email } });

          if (user) {
            if (!emailVerified) {
              return done(new Error("Email not verified by Google, cannot link account"), null);
            }
            user = await prisma.user.update({
              where: { id: user.id },
              data: { googleId: profile.id, provider: "google" },
            });
          } else {
            // 3. Brand new user
            user = await prisma.user.create({
              data: {
                email,
                googleId: profile.id,
                provider: "google",
                name: profile.displayName,
                role: "USER",
                preferences: {},
              },
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;