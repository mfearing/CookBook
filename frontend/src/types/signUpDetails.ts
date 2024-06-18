import LoginDetails from "./loginDetails";

export interface SignUpDetails extends LoginDetails {
    firstName: string,
    lastName: string
}