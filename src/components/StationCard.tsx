import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Fuel } from "lucide-react";

interface StationCardProps {
  name: string;
  address: string;
  distance: string;
  rating: number;
  pricePerKg: number;
  availability: "Available" | "Busy" | "Full";
  onBook: () => void;
}

const StationCard = ({ 
  name, 
  address, 
  distance, 
  rating, 
  pricePerKg, 
  availability, 
  onBook 
}: StationCardProps) => {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-success text-success-foreground";
      case "Busy": return "bg-warning text-warning-foreground";
      case "Full": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{address}</span>
            </div>
          </div>
          <Badge className={`${getAvailabilityColor(availability)} ml-2`}>
            {availability}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{distance}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-2 text-warning fill-current" />
            <span className="text-sm">{rating}/5.0</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Fuel className="h-4 w-4 mr-2 text-primary" />
            <span className="font-semibold text-lg">₹{pricePerKg}/kg</span>
          </div>
        </div>
        
        <Button 
          onClick={onBook}
          className="w-full"
          disabled={availability === "Full"}
        >
          {availability === "Full" ? "Station Full" : "Book Now"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default StationCard;