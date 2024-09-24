export interface HeaderMenuItem {
  label: string,
  action?: any
  args?: any
  icon?: string
  setActive?: boolean
}

export interface HeaderMenuOptions {
  header?: string,
  items?: HeaderMenuItem[]
}
