import { PropsWithChildren, ReactNode } from 'react'

export type DropdownProps = PropsWithChildren<{
  containerClassName?: string
  content: ReactNode
  open?: boolean
  onClose?: () => void
  onOpen?: () => void
  //   NOTE: Box default position is below the field aligned in the left side
  boxClassName?: string
  // NOTE: Just used on mobile devices
  modalClassName?: string
  scrollTarget?: string
}>

export type DropdownRef = {
  open: () => void
  close: () => void
  isOpen: boolean
}
