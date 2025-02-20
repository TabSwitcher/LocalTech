import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import eventsRouter from './routes/events.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mount events routes at /api/events
app.use('/api/events', eventsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
