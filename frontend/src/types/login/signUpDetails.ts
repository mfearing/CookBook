import LoginDetails from "./loginDetails";

export default interface SignUpDetails extends LoginDetails {
    firstName: string,
    lastName: string
}