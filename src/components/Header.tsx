import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Fuel, MapPin, User } from "lucide-react";

const Header = () => {
  return (
    <Card className="bg-gradient-to-r from-primary to-secondary border-0 shadow-elegant">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
              <Fuel className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CNG Station</h1>
              <p className="text-sm text-white/80">Clean Energy Solutions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <MapPin className="h-4 w-4 mr-2" />
              Find Stations
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Header;