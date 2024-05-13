import { User } from "./User";

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
}

export interface VehicleWithRentStatus extends Vehicle {
  rented: boolean;
  startRentDateTime: Date;
  endRentDateTime: Date;
}

export interface VehicleEditProps {
  vehicle: Vehicle;
  onFinishedEditing: () => void;
}
