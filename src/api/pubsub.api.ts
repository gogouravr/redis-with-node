import { Router, Request, Response } from "express";

import RedisClient from '../utils/redis';

const router = Router();
let counter = 1;

router.post('/publish/:channel', async (req: Request, res: Response) => {
    const { msg } = req.body;
    const { channel } = req.params;
    //create a client for publishing
    const publisher = new RedisClient();
    await publisher.connect();
    const response = await publisher.publish(channel, msg);
    res.json({ msg: 'success', response });
});

router.post('/subscribe/:channel', async (req: Request, res: Response) => {
    const { channel } = req.params;
    //create a subscriber redis client
    const subscriber = new RedisClient();
    await subscriber.connect();
    const clinetCount = counter++;
    const response = await subscriber.subscribe(channel, (message: string, channel: string) => console.log(clinetCount, channel, message));
    res.json({ msg: 'success', channel, response: response });
});

export default router;