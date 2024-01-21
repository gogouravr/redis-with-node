import { Router, Request, Response } from "express";

import RedisClient from '../utils/redis';

const router = Router();
const redisClient = new RedisClient();
redisClient.connect();

router.post('/publish', (req: Request, res: Response) => {
    const data = req.body;
    console.log(JSON.stringify(data));
    res.json({ msg: 'success' });
})

router.get('/store/:key', async (req: Request, res: Response) => {
    const { key } = req.params;
    console.log(key);
    const value: string = await redisClient.get(key);
    res.json({ data: value });
})

export default router;