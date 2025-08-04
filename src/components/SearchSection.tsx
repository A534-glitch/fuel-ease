import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter } from "lucide-react";

interface SearchSectionProps {
  onSearch: (location: string, radius: string) => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("5");

  const handleSearch = () => {
    onSearch(location, radius);
  };

  return (
    <Card className="shadow-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter your location or pincode"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="md:w-48">
            <Select value={radius} onValueChange={setRadius}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">Within 2 km</SelectItem>
                <SelectItem value="5">Within 5 km</SelectItem>
                <SelectItem value="10">Within 10 km</SelectItem>
                <SelectItem value="20">Within 20 km</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleSearch} className="md:w-auto w-full">
            <Search className="h-4 w-4 mr-2" />
            Find Stations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchSection;