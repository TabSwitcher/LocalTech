"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { EventType } from '../app/page';

interface EventsGridProps {
  events: EventType[];
  onEdit: (event: EventType) => void;
}

const EventsGrid: React.FC<EventsGridProps> = ({ events, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {events.map((event) => (
        <Card key={event.id} className="shadow-lg">
          <CardHeader>
            <CardTitle>{event.eventName}</CardTitle>
            <CardDescription>{event.eventType}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Address:</strong> {event.address}</p>
            <p><strong>Organizer:</strong> {event.organizerName}</p>
            <p><strong>Date:</strong> {event.eventDate}</p>
            <p><strong>Time:</strong> {event.eventTime}</p>
          </CardContent>
          <div className="p-4">
            <Button onClick={() => onEdit(event)}>Edit</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EventsGrid;
