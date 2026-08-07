import { Mail } from 'lucide-react'
import type { User } from '../types/user'

const UserItem = ({ user }: { user: User }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300  dark:border-slate-800 dark:bg-slate-900">
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {user.name}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Mail className="h-4 w-4 shrink-0 text-slate-400" />
          <p className="truncate text-sm font-medium">{user.email}</p>
        </div>
      </div>
    </div>
  )
}

export default UserItem
