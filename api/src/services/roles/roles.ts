import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const roles = () => {
  return db.role.findMany()
}

export const role = ({ id }: Prisma.RoleWhereUniqueInput) => {
  return db.role.findUnique({
    where: { id },
  })
}

export const Role = {
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof role>>) =>
    db.role.findUnique({ where: { id: root.id } }).user(),
}
