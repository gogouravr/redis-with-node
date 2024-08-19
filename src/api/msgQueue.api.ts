import { Router, Request, Response } from "express";

import RedisClient from '../utils/redis';

const router = Router();
const redisClient = new RedisClient();
redisClient.connect();

router.post('/:queuename', async (req: Request, res: Response) => {
    const { operation, msg } = req.body;
    const { queuename } = req.params;
    const serializedMsg = JSON.stringify(msg);
    let response;

    try {
        if (operation === 'enqueue') {
            response = await redisClient.enqueue(queuename, serializedMsg);
        } else if (operation === 'dequeue') {
            response = await redisClient.dequeue(queuename);
        } else {
            return res.status(400).json({ msg: 'invalid operation' })
        }
        res.json({ msg: 'success', response });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'error', error: JSON.stringify(error) });
    }
});

export default router;