import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.RoleCreateArgs>({
  role: {
    one: {
      data: {
        name: 'String',
        user: {
          create: {
            name: 'String',
            email: 'String2064579',
            phoneNumber: 'String',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        user: {
          create: {
            name: 'String',
            email: 'String9206061',
            phoneNumber: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
