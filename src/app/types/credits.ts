export type CreditsDTO = {
    cast: Actor[]
}

export type Actor = {
    profile_path: string
    name: string
    character: string
}