"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CitySearchFormProps {
  onSearch: (cityName: string) => void;
}

const CitySearchForm: React.FC<CitySearchFormProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(city);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
      <Input 
        type="text" 
        value={city} 
        onChange={handleChange} 
        placeholder="Enter city name" 
        className="w-64"
        required 
      />
      <Button type="submit">Search Events</Button>
    </form>
  );
};

export default CitySearchForm;
