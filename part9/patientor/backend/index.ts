const express = require('express')

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req: any, res: { send: (arg: string) => void }) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});