import { z } from 'zod'
export const zParsedBoolean = z.preprocess(Boolean, z.boolean())
export const zParsedNumber = z.preprocess(Number, z.number())
