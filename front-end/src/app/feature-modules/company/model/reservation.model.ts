import { Equipment } from "../../equipment/model/equipment.model";
import { Appointment } from "./appointment.model";

export interface Reservation {
    id: number,
    status: ReservationStatus,
    appointment: Appointment

}
export enum ReservationStatus {
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
    CLAIMED = 'CLAIMED',
    EXPIRED = 'EXPIRED'
  }