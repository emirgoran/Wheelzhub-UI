export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
}

export interface VehicleEditProps {
  vehicle: Vehicle;
}
