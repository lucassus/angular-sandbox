import { Router } from 'express';
import { db } from '../db';

const router: Router = Router();

router.post('/', (req, res) => {
  db.seed().then(() => {
    res.sendStatus(200);
  });
});

export { router };
