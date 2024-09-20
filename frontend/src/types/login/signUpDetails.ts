import LoginDetails from "./loginDetails";
import UserPreferences from "./preferences";

export default interface SignUpDetails extends LoginDetails {
    firstName: string,
    lastName: string,
    preferences: UserPreferences
}