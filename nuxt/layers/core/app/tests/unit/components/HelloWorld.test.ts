import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { HelloWorld } from '#components'

describe('<HelloWorld />', () => {
  it('should render', async () => {
    const wrapper = await mountSuspended(HelloWorld)
    console.log(wrapper.html())
    expect(wrapper).toBeTruthy()
  })
})
