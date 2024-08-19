import { Router, Request, Response } from "express";

import RedisClient from '../utils/redis';

const router = Router();
const redisClient = new RedisClient();
redisClient.connect();

router.post('/enqueue/:queuename', async (req: Request, res: Response) => {
    const { msg } = req.body;
    const { queuename } = req.params;
    const response = await redisClient.enqueue(queuename, msg);
    res.json({ msg: 'success', response });
});

router.get('/dequeue/:queuename', async (req: Request, res: Response) => {
    const { queuename } = req.params;
    const response = await redisClient.dequeue(queuename);
    res.json({ msg: 'success', response });
});

export default router;