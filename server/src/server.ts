
import express, { Request, Response } from "express";
import cors from "cors";
import webpush from 'web-push'

import connection from './database/connection'

console.clear()

webpush.setVapidDetails(
  'mailto: edu27.cassimiro@gmail.com',
  'BNJWjB-7qlW3-ZQMNQ6FZKClH1FpagqK7P-x80xhAvFARm_omnwFtgm0svpFtIdU5vmJvE3zMcqsVFVEF7VRhwM',
  '6I2dC6P13Msq1I_c2wNR9FbqolaEsZ5GLLIq8cYEoHk',
);

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/user', async (_req: Request, res: Response) => {
    const users = await connection("users").select('*')
    res.json(users)
})

app.post('/user', async (req: Request, res: Response) => {
    const user = req.body.user
    const id = await connection("users").insert({ user })
    res.json({ id })
})

app.post('/subscription/user/:userId', async (req: Request, res: Response) => {

    const userId = req.params.userId
    const { endpoint, keys } = req.body.subscription

    await connection("subscription").insert({
        endpoint,
        p256dhKey: keys.p256dh,
        authKey: keys.auth,
        userId
    })

    res.json({ message: 'inscrito com sucesso' })
})

app.post('/notification/user/:userId', async (req: Request, res: Response) => {

    const userId = req.params.userId
    const { senderId } = req.body

    const { user } = await connection("users").select("user").where({ id: senderId }).first()
    const { endpoint, p256dhKey, authKey } = await connection("subscription").select("*").where({ userId }).first()

    const pushSubscription = {
        endpoint,
        keys: {
          p256dh: p256dhKey,
          auth: authKey,
        }
      };

    webpush.sendNotification(pushSubscription, JSON.stringify({ sender: String(user) }))    
    res.json({ message: 'notificação enviada' })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));