import type UserPreferences from "./preferences"

export default interface UserDetails{
    id?: number,
    firstName: string,
    lastName: string,
    login: string,
    preferences: UserPreferences,
    token: string,
    role: string
}