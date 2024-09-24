import DOMPurify from 'dompurify'
import type { DOMPurifyI } from 'dompurify'

export default defineNuxtPlugin(async () => {
  let sanitize: DOMPurifyI['sanitize']

  if (import.meta.server) {
    const { JSDOM } = await import('jsdom')
    sanitize = DOMPurify(new JSDOM('').window).sanitize
  } else {
    sanitize = DOMPurify.sanitize
  }

  return {
    provide: {
      sanitize
    }
  }
})
