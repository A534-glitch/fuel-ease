import { useState } from "react";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import StationCard from "@/components/StationCard";
import BookingModal from "@/components/BookingModal";
import PaymentModal from "@/components/PaymentModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fuel, MapPin, Clock, TrendingUp } from "lucide-react";

const Index = () => {
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Mock data for CNG stations
  const stations = [
    {
      id: 1,
      name: "Green Energy CNG Station",
      address: "Sector 15, Noida, UP",
      distance: "2.5 km away",
      rating: 4.5,
      pricePerKg: 75.50,
      availability: "Available" as const,
    },
    {
      id: 2,
      name: "EcoFuel CNG Hub",
      address: "MG Road, Bangalore, KA",
      distance: "3.2 km away",
      rating: 4.2,
      pricePerKg: 76.25,
      availability: "Busy" as const,
    },
    {
      id: 3,
      name: "CleanAir CNG Center",
      address: "Andheri West, Mumbai, MH",
      distance: "1.8 km away",
      rating: 4.7,
      pricePerKg: 77.00,
      availability: "Available" as const,
    },
    {
      id: 4,
      name: "Natural Gas Station",
      address: "Connaught Place, Delhi",
      distance: "4.1 km away",
      rating: 4.0,
      pricePerKg: 75.75,
      availability: "Full" as const,
    }
  ];

  const handleStationBook = (station: any) => {
    setSelectedStation(station);
    setIsBookingModalOpen(true);
  };

  const handleSearch = (location: string, radius: string) => {
    console.log("Searching for stations near:", location, "within", radius, "km");
    // Implement search logic here
  };

  const stats = [
    { label: "Total Stations", value: "1,245", icon: Fuel, color: "text-primary" },
    { label: "Cities Covered", value: "156", icon: MapPin, color: "text-secondary" },
    { label: "Avg. Wait Time", value: "5 min", icon: Clock, color: "text-accent" },
    { label: "Bookings Today", value: "8,921", icon: TrendingUp, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Book Your CNG Station
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find and book CNG stations near you. Skip the queue and pay online for a seamless experience.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchSection onSearch={handleSearch} />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className={`flex justify-center mb-3 ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stations Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              Nearby CNG Stations
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station) => (
            <StationCard
              key={station.id}
              name={station.name}
              address={station.address}
              distance={station.distance}
              rating={station.rating}
              pricePerKg={station.pricePerKg}
              availability={station.availability}
              onBook={() => handleStationBook(station)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedStation && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          stationName={selectedStation.name}
          pricePerKg={selectedStation.pricePerKg}
        />
      )}

      {bookingDetails && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          amount={bookingDetails.totalAmount}
          bookingDetails={bookingDetails}
        />
      )}
    </div>
  );
};

export default Index;
