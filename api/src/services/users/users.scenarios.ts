import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { uid: 'String269664', name: 'String', email: 'String' } },
    two: { data: { uid: 'String4285089', name: 'String', email: 'String' } },
  },
})

export type StandardScenario = typeof standard
