import type { ButtonHTMLAttributes } from 'react'

export const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: 'primary' | 'secondary' | 'default' | 'destructive'
  },
) => {
  const variantClasses = {
    primary:
      'flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
    secondary:
      'flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500',
    default:
      'flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300',
    destructive:
      'flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
  }

  return (
    <button type="submit" className={variantClasses[props.variant]}>
      {props.children}
    </button>
  )
}
