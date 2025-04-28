import express, { NextFunction } from 'express';
import { Response, Request } from 'express';
import { swaggerConfig } from './swagger/swaggerConfig';
import { register, login, logout } from './authController';
import { errorMiddleware } from './errorMiddleware';
import { authenticate } from './authMiddleare';
import { users } from './memoryStore';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { logger } from './logger/logger';
import session from 'express-session';


interface CustomSession extends session.Session {
  visitCount?: number;
}

interface CustomRequest extends Request {
  session: CustomSession;
}

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const reqlogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
};

app.use(express.json());
app.use(reqlogger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }),
);

app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);

app.get('/', (req: Request, res: Response) => {
  logger.info('GET / - Hello world endpoint accessed');
  res.send('Hello world');
});

// Use our custom request type for this route
app.get('/visit-count', (req: CustomRequest, res: Response) => {
  if (req.session.visitCount === undefined) {
    req.session.visitCount = 0;
  }

  req.session.visitCount++;

  logger.info(`GET /visit-count - Visit count: ${req.session.visitCount}`);

  res.json({ message: `This is your visit number ${req.session.visitCount}` });
});

app.post('/post', (req: Request, res: Response) => {
  logger.info('POST /post - Post request endpoint accessed');
  res.send('This is a post request');
});

app.put('/put', (req: Request, res: Response) => {
  logger.info('PUT /put - Put request endpoint accessed');
  res.send('This is a put request');
});

app.delete('/delete', (req: Request, res: Response) => {
  logger.info('DELETE /delete - Delete request endpoint accessed');
  res.send('This is a delete request');
});

app.get('/profile', authenticate, (req, res) => {
  const user = users.find((u) => u.id === (req as any).userId);
  const username = user ? user.username : 'Unknown User';

  logger.info(
    `GET /profile - Profile endpoint accessed by username: ${username}`,
  );
  res.json({ message: `Welcome User ${username}` });
});

app.get('/users', authenticate, (req, res) => {
  const user = users.find((u) => u.id === (req as any).userId);
  const username = user ? user.username : 'Unknown User';

  logger.info(`GET /users - Users endpoint accessed by username: ${username}`);
  res.json({ users });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
  logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});