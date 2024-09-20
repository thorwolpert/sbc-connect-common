export default defineAppConfig({
  myLayer: {
    name: 'Hello from Nuxt layer'
  },
  ui: {
    primary: 'blue',
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
        header: 'text-{color}-500 tracking-wide text-base hover:text-{color}-600 disabled:text-{color}-500 dark:text-white dark:hover:text-blue-300 dark:disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-white',
        solid: 'shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-[#E0E7ED] dark:hover:bg-bcGovGray-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-white',
        outline: 'ring-1 ring-inset ring-current text-{color}-500 dark:text-[#E0E7ED] hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-[#E0E7ED]/25 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-white'
      }
      // default: {
      //   size: 'bcGov'
      // }
    },
    chip: {
      base: 'absolute rounded-full ring-0 dark:ring-gray-900 flex items-center justify-center text-white dark:text-gray-900 font-medium whitespace-nowrap'
    },
    dropdown: {
      container: 'overflow-clip rounded-md shadow-md',
      rounded: 'rounded-md',
      padding: 'py-0 px-0',
      width: 'min-w-[250px]',
      height: 'max-h-[75dvh]',
      item: {
        rounded: 'rounded-none',
        base: 'flex items-center gap-2 w-full hover:text-bcGovColor-activeBlue hover:bg-bcGovColor-gray1',
        padding: 'px-4 py-3',
        disabled: 'cursor-default font-semibold opacity-100 hover:bg-white pt-0',
        active: 'bg-bcGovColor-gray1 text-bcGovColor-activeBlue',
        icon: {
          base: 'flex-shrink-0 size-4 text-bcGovColor-activeBlue',
          active: 'text-bcGovColor-activeBlue',
          inactive: 'text-bcGovColor-midGray'
        }
      }
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
