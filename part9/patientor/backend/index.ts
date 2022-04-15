const express = require('express')
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req: any, res: { send: (arg: string) => void }) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});