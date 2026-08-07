import UserItem from './UserItem'
import type { User } from '../types/user'

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className="rounded-xl text-gray-900">
      <div
        className={`grid grid-cols-4 gap-4`}
      >
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default UserList
