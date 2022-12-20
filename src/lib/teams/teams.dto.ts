export interface CreateTeamDto {
  tournamentId: string
  name: string
  code: string
  country: string
}

export interface PutTeamDto {
  tournamentId: string
  name: string
  code: string
  country: string
}

export interface PatchTeamDto extends Partial<PutTeamDto> {}
