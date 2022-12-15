export interface CreateGeneratedUserDto {
  email: string
  password: string
}

export interface CreateUserDto {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface PutUserDto {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface PatchUserDto extends Partial<PutUserDto> {}
