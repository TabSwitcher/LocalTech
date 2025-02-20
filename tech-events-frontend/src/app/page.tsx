"use client";

import { useState, ChangeEvent } from 'react';
import CitySearchForm from '../components/CitySearchForm';
import EventsGrid from '../components/EventsGrid';
import EventForm from '../components/EventForm';
import { Input } from '@/components/ui/input';

export interface EventType {
  id?: string;
  eventName: string;
  location: string;
  address: string;
  organizerName: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
}

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const fetchEvents = async (cityName: string) => {
    if (!cityName) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events?city=${cityName}`);
      const data: EventType[] = await res.json();
      console.log(data);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCitySearch = (cityName: string) => {
    setCity(cityName);
    fetchEvents(cityName);
  };

  const handleEventUpdate = () => {
    fetchEvents(city);
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Local Tech Events</h1>
      <CitySearchForm onSearch={handleCitySearch} />

      {events.length > 0 && (
        <>
          <div className="my-4 max-w-md">
            <label className="block text-sm font-medium mb-1">
              Search by Event Name
            </label>
            <Input 
              type="text"
              className="input input-bordered w-full"
              value={searchKeyword}
              onChange={handleSearchChange}
              placeholder="Search events..."
            />
          </div>
          <EventsGrid events={filteredEvents} onEdit={setSelectedEvent} />
        </>
      )}

      <EventForm selectedEvent={selectedEvent} onSuccess={handleEventUpdate} />
    </div>
  );
}
