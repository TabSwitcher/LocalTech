import { Router } from 'express';
import csvService from '../services/csvService.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// GET /api/events?city=CityName
router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    let events = await csvService.readEvents();
    if (city && typeof city === 'string') {
      events = events.filter(event => event.location.toLowerCase() === city.toLowerCase());
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

// POST /api/events
router.post('/', async (req, res) => {
  try {
    const newEvent = { id: uuidv4(), ...req.body };
    const events = await csvService.readEvents();
    events.push(newEvent);
    csvService.writeEvents(events);
    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT /api/events/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const events = await csvService.readEvents();
    const index = events.findIndex(event => event.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }
    events[index] = { ...events[index], ...updatedData };
    csvService.writeEvents(events);
    res.json(events[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

export default router;
