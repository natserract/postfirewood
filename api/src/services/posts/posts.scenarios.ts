import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        title: 'String',
        slug: 'String',
        body: 'String',
        user: {
          create: { uid: 'String8427668', name: 'String', email: 'String' },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        slug: 'String',
        body: 'String',
        user: {
          create: { uid: 'String3825714', name: 'String', email: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
