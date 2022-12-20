import { MatchSchema } from './matches.model'

export interface CreateMatchDto extends Omit<MatchSchema, 'id'> {}

export interface PutMatchDto extends Omit<MatchSchema, 'id'> {}

export interface PatchMatchDto extends Partial<PutMatchDto> {}
