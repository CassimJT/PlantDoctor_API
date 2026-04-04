// // src/controllers/auth.controller.mjs

// export const register = async (req, res, next) => {
//   res.json({ message: "register endpoint" })
// }

// export const login = async (req, res, next) => {
//   res.json({ message: "login endpoint" })
// }

// export const refresh = async (req, res, next) => {
//   res.json({ message: "refresh endpoint" })
// }

// export const logout = async (req, res, next) => {
//   res.json({ message: "logout endpoint" })
// }

// export const me = async (req, res, next) => {
//   res.json({ message: "current user endpoint" })
// }

import { signAccessToken, signRefreshToken } from "../utils/helpers.mjs";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
import RefreshToken from "../models/RefreshToken.mjs";
import { hashPassword, comparePassword } from "../utils/password.mjs";

// Helper to strip sensitive data
const getSafeUser = (user) => {
  const { password, ...safeUser } = user.toObject();
  return safeUser;
};

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, emailAddress, password, phoneNumber } = req.body || {};

    if (!firstName || !lastName || !emailAddress || !password || !phoneNumber) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email address already registered" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ firstName, lastName, emailAddress, password: hashedPassword, phoneNumber });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    // Expiry is now handled by the RefreshToken model's schema defaults or TTL
    await RefreshToken.create({ user: user._id, token: refreshToken });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: getSafeUser(user),
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { emailAddress, password } = req.body || {};

    if (!emailAddress || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ emailAddress });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Clear old tokens for this user
    await RefreshToken.deleteMany({ user: user._id });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    await RefreshToken.create({ user: user._id, token: refreshToken });

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        user: getSafeUser(user),
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body || {};

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: "Refresh token is required" });
    }

    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
    if (!tokenDoc) {
      return res.status(401).json({ success: false, message: "Refresh token not found" });
    }

    let payload;
    try {
      // Accessing secret via environment variable directly
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // Rotate the token: Delete old and create new
    await RefreshToken.deleteOne({ _id: tokenDoc._id });

    const accessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken(user);

    await RefreshToken.create({ user: user._id, token: newRefreshToken });

    return res.json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        accessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body || {};

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: "Refresh token is required" });
    }

    await RefreshToken.deleteOne({ token: refreshToken });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};