import * as dotenv from 'dotenv';

import Pusher from 'pusher-js';

dotenv.config();


const pusher = new Pusher(process.env.PUSHER_KEY || "", {
  cluster: process.env.PUSHER_CLUSTER || "",
});