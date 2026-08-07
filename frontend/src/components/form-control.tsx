import { type InputHTMLAttributes } from 'react'

export const FormControlInput = (
  props: InputHTMLAttributes<HTMLInputElement>,
) => {
  return (
    <input
      id="email"
      name="email"
      type="email"
      required
      autoComplete="email"
      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      {...props}
    />
  )
}

export const FormControlLabel = (props: {
  htmlFor: string
  children: React.ReactNode
}) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className="block text-sm/6 font-medium text-gray-100"
    >
      {props.children}
    </label>
  )
}
