import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

router.get('/search', async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search as string;
    const ninjaRes = await axios.get(`https://api.api-ninjas.com/v1/recipe?query=${searchQuery}`, {
      headers: {
        'X-Api-Key': process.env.NINJA_API_KEY || ''
      }
    });

    res.json({
      results: ninjaRes.data
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

export default router;