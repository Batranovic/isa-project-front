import { Equipment } from "../../equipment/model/equipment.model";
import { Appointment } from "./appointment.model";

export interface Reservation {
    id: number,
    status: ReservationStatus,
    equipment: Equipment[],
    appointment: Appointment

}
export enum ReservationStatus {
    PENDING = 0, CANCELED = 1, CLAIMED = 2, EXPIRED = 3
  }