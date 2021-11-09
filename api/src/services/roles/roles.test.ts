import { roles } from './roles'
import type { StandardScenario } from './roles.scenarios'

describe('roles', () => {
  scenario('returns all roles', async (scenario: StandardScenario) => {
    const result = await roles()

    expect(result.length).toEqual(Object.keys(scenario.role).length)
  })
})
