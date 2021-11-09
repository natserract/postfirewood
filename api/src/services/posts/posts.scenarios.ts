import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        title: 'String',
        slug: 'String',
        body: 'String',
        user: {
          create: {
            name: 'String',
            email: 'String7939344',
            phoneNumber: 'String',
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        slug: 'String',
        body: 'String',
        user: {
          create: {
            name: 'String',
            email: 'String8712647',
            phoneNumber: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
