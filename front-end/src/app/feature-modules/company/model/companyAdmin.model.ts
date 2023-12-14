import { User } from "src/app/infrastructure/model/user.model";
import { Company } from "./company.model";

export interface CompanyAdmin {
    id: number,
    user: User,
    company: Company
}