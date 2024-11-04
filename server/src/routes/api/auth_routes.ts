import {Router, Request, Response} from 'express';
import { createToken, verifyToken } from '../helpers/index.js';
import { User } from '../../models/index.js';

const router = Router();

// localhost:3333/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    // Generate a JWT token
    const token = createToken(user.id);

    // Send the token inside of a cookie to the client/browser
    // It will be stored in browser/insomnia memory and can be viewed through the Dev Tools Application tab
    res.cookie('token', token, {
      // Keep the cookie from being accessed by browser JS
      httpOnly: true
    });

    // Send back the user object
    res.json({
      user: user
    });
  } catch (error: any) {
    console.log('REGISTER ERROR', error);

    if (error.errors) {
      res.status(403).json({
        user: null,
        message: error.errors[0].message
      });
    } else {
      res.status(403).json({
        user: null,
        message: 'Registration failed. Please try again.'
      });
    }
    
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const {email, password} = req.body;

  // Check if there is a user with that email address provided in the form
  const user = await User.findOne({
    where: {
      email
    }
  });

  // If we can't find them, we send back an error
  if (!user) {
    res.status(403).json({
      // We can use this property on the front end to cause a redirect over to the register form
      notFound: true,
      user: null,
      message: 'No user found with that email address'
    });
  } else {
    // Use our instance method we defined in the User.tsx file to check if their password is correct
    // This compares the form password they typed (ie. 'password123') to an ecrypted string
    // If they match up then validatePassword returns a true boolean
    const valid_pass = await user.validatePassword(password);
   
    if (!valid_pass) {
      res.status(403).json({
        user: null,
        message: 'Your password is incorrect'
      });
      return;
    }

    // Once they've been found and their password is validated, we send them a cookie with a token
    const token = createToken(user.id);

    res.cookie('token', token, {
      httpOnly: true
    });

    // Send back the user object
    res.json({
      user
    })
  }
});

// This route is basically used to provide the front end with the logged in user's data
// If the user is not logged in (has no cookie with a valid token), we just send back a null user value
router.get('/user', async (req: Request, res: Response) => {
  const token = req.cookies?.token;

  if (!token) {
    res.json({
      user: null
    });
    return;
  }

  const userData = verifyToken(token);

  if (userData && typeof userData !== 'string') {
    const user = await User.findByPk(userData.user_id);

    res.json({ user });
    return;
  }
  
  res.json({ user: null });
});

// Log out user
router.get('/logout', async (_, res: Response) => {
  // Delete the cookie from the client/browser - This essentially logs them out because they don't have a cookie to send
  res.clearCookie('token');
  res.json({
    message: 'Logged out successfully!'
  })
});


export default router;