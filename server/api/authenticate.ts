import { Router } from 'express';

const router: Router = Router();

router.post('/', (req, res) => {
  const { login, password } = req.body;

  if (login === 'admin' && password === 'password') {
    res.sendStatus(200);
  } else {
    res.sendStatus(422);
  }
});

export { router };
