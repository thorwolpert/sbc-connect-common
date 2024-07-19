export default defineAppConfig({
  myLayer: {
    name: 'Hello from Nuxt layer'
  },
  ui: {
    primary: 'bcGovBlue',
    gray: 'bcGovGray',
    button: {
      size: {
        bcGov: 'text-sm'
      },
      padding: {
        bcGov: 'px-7 py-3'
      },
      gap: {
        bcGov: 'gap-x-2.5'
      },
      square: {
        bcGov: 'p-1.5'
      },
      icon: {
        size: {
          bcGov: 'h-5 w-5'
        }
      },
      color: {
        white: {
          header: 'text-white text-sm tracking-wide dark:text-white hover:bg-white/[0.1] dark:bg-gray-900 dark:hover:bg-gray-800/75 focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-white transition-colors duration-300 ease-in-out',
          solid: 'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-white'
        }
      },
      variant: {
        header: 'text-{color}-500 tracking-wide text-base hover:text-{color}-600 disabled:text-{color}-500 dark:text-white dark:hover:text-bcGovBlue-300 dark:disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-white',
        solid: 'shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-[#E0E7ED] dark:hover:bg-bcGovGray-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-white',
        outline: 'ring-1 ring-inset ring-current text-{color}-500 dark:text-[#E0E7ED] hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-[#E0E7ED]/25 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-white'
      }
      // default: {
      //   size: 'bcGov'
      // }
    },
    chip: {
      base: 'absolute rounded-full ring-0 dark:ring-gray-900 flex items-center justify-center text-white dark:text-gray-900 font-medium whitespace-nowrap'
    }
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
