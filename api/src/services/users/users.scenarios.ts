import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { name: 'String', email: 'String4383251', phoneNumber: 'String' },
    },
    two: {
      data: { name: 'String', email: 'String2421040', phoneNumber: 'String' },
    },
  },
})

export type StandardScenario = typeof standard
