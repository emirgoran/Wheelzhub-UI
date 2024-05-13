import { User } from "./User";
import { Vehicle } from "./Vehicle";

export interface Rent {
  user: User;
  vehicle: Vehicle;
  startDateTime: Date | undefined;
  endDateTime: Date | undefined;
}