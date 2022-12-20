export interface CreateTournamentDto {
  name: string
  country: string
}

export interface PutTournamentDto {
  name: string
  country: string
}

export interface PatchTournamentDto extends Partial<PutTournamentDto> {}
