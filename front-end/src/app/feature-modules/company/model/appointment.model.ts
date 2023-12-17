import { DatePipe } from "@angular/common"
import { CompanyAdmin } from "./companyAdmin.model"

export interface Appointment {
    id: number,
    companyAdmin: CompanyAdmin
    dateAndTime: Date,
    duration: number,
    status: AppointmentStatus
}

export enum AppointmentStatus {
    FREE = 0,
    OCCUPIED = 1
  }
  