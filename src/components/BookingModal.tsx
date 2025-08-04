import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, CreditCard, User, Car } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
  pricePerKg: number;
}

const BookingModal = ({ isOpen, onClose, stationName, pricePerKg }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [vehicleNumber, setVehicleNumber] = useState("");

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  const totalAmount = quantity * pricePerKg;

  const handleBooking = () => {
    // Handle booking logic here
    console.log("Booking:", { selectedDate, selectedTime, quantity, vehicleNumber, totalAmount });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Car className="h-5 w-5 mr-2 text-primary" />
            Book CNG at {stationName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Select Date
            </Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Select Time Slot
            </Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Choose time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Vehicle Number
            </Label>
            <Input
              placeholder="e.g., MH 01 AB 1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            />
          </div>

          {/* Quantity Selection */}
          <div className="space-y-2">
            <Label>Quantity (kg)</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="text-center"
                min="1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Price Summary */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span>Total Amount:</span>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  ₹{totalAmount.toFixed(2)}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {quantity} kg × ₹{pricePerKg}/kg
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || !vehicleNumber}
              className="flex-1"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Pay
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;