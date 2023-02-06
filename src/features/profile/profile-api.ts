export type UserType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод

    created: string
    updated: string
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean

    error?: string
}