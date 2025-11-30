import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import {
  signUpWithEmail,
  signInWithEmailOrUsername,
  signOutUser,
  isLoggedIn,
} from '../controllers/auth-controller.js';

import { FRONTEND_URL, JWT_SECRET, NODE_ENV } from '../config/utils.js';

const router = Router();

//REGULAR EMAIL PASSWORD STRATEGY
router.post('/email-password/signup', signUpWithEmail);
router.post('/email-password/signin', signInWithEmailOrUsername);

// Google-login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    let token = '';
    if (!req.user) {
      return res.redirect(`${FRONTEND_URL}/signup?error=auth_failed`);
    }
    if (JWT_SECRET) {
      token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1h' });
    }
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.redirect(`${FRONTEND_URL}/signup?google-callback=true`);
  }
);

router.get('/check', authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  const token = req.cookies.access_token;
  res.json({
    token,
    user: {
      _id: req.user._id,
      role: req.user.role,
    },
  });
});

//SIGN OUT
router.post('/signout', authMiddleware, signOutUser);

//CHECK USER STATUS
router.get('/check/:_id', authMiddleware, isLoggedIn);

export default router;
