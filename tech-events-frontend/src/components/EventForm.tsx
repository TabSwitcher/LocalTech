"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { EventType } from '../app/page';
import { useToast } from "@/hooks/use-toast";

interface EventFormProps {
  selectedEvent: EventType | null;
  onSuccess: () => void;
}

const initialFormState: EventType = {
  eventName: "",
  location: "",
  address: "",
  organizerName: "",
  eventDate: "",
  eventTime: "",
  eventType: "Conference"
};

const EventForm: React.FC<EventFormProps> = ({ selectedEvent, onSuccess }) => {

  //This's how its simple to do a toast with shadcn library
  const { toast } = useToast();

  const [formData, setFormData] = useState<EventType>(initialFormState);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        eventName: selectedEvent.eventName,
        location: selectedEvent.location,
        address: selectedEvent.address,
        organizerName: selectedEvent.organizerName,
        eventDate: selectedEvent.eventDate,
        eventTime: selectedEvent.eventTime,
        eventType: selectedEvent.eventType,
        id: selectedEvent.id
      });
      // Here I'm Initializing selectedDate from the eventDate string (byassuming YYYY-MM-DD format)
      setSelectedDate(new Date(selectedEvent.eventDate));
    } else {
      setFormData(initialFormState);
      setSelectedDate(null);
    }
  }, [selectedEvent]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = selectedEvent 
        ? `http://localhost:5000/api/events/${selectedEvent.id}` 
        : "http://localhost:5000/api/events";
      const method = selectedEvent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess();
        setFormData(initialFormState);
        toast({
          title: "Success",
          description: "Event has been submitted successfully",

        });
        setSelectedDate(null);
      }
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">{selectedEvent ? "Edit Event" : "Create New Event"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div className="flex flex-col">
          <label htmlFor="eventName">Event Name</label>
          <Input type="text" name="eventName" id="eventName" value={formData.eventName} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="location">Location</label>
          <Input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address">Address</label>
          <Input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="organizerName">Organizer Name</label>
          <Input type="text" name="organizerName" id="organizerName" value={formData.organizerName} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <label>Event Date</label>
          <Calendar
            mode="single"
            selected={selectedDate!}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                // I'm converting date to YYYY-MM-DD string format in order to use it
                const isoDate = date.toISOString().split("T")[0];
                setFormData(prev => ({ ...prev, eventDate: isoDate }));
              }
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventTime">Event Time</label>
          <Input type="time" name="eventTime" id="eventTime" value={formData.eventTime} onChange={handleChange} required />
        </div>
        <div className="flex flex-col">
          <label>Event Type</label>
          <Select 
            value={formData.eventType} 
            onValueChange={(value: string) => setFormData(prev => ({ ...prev, eventType: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Conference">Conference</SelectItem>
              <SelectItem value="Meeting">Meeting</SelectItem>
              <SelectItem value="Dining">Dining</SelectItem>
              <SelectItem value="Studying">Studying</SelectItem>
              <SelectItem value="Working">Working</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">{selectedEvent ? "Update Event" : "Create Event"}</Button>
      </form>
    </div>
  );
};

export default EventForm;
