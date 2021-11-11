import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.RoleCreateArgs>({
  role: {
    one: {
      data: {
        name: 'String',
        user: {
          create: { uid: 'String6939337', name: 'String', email: 'String' },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        user: {
          create: { uid: 'String2771764', name: 'String', email: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
