import type { Pinia, Store } from 'pinia'
import { getActivePinia } from 'pinia'

interface ExtendedPinia extends Pinia {
  _s: Map<string, Store>;
}

/**
 * Resets all Pinia stores that have a `$reset` method.
*/
export function resetPiniaStores (): void {
  const pinia = getActivePinia() as ExtendedPinia
  const env = useRuntimeConfig().public.environment

  if (!pinia) {
    console.error('There are no stores')
  }

  // null check still fails so must catch error instead
  pinia._s.forEach((store) => {
    try {
      store.$reset()
    } catch {
      if (env === 'Development') {
        console.warn(`Store "${store.$id}" does not implement $reset. Skipping reset.`)
      }
    }
  })
}
