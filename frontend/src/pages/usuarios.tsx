import { useEffect, useState } from 'react'
import UserList from '../components/UserList'
import { api } from '../lib/api'
import type { User } from '../types/user'
import type { ListResponse } from '../types/common'
import { Button } from '../components/button'
import { Modal } from '../components/modal'
import AddUser from '../components/AddUser'

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const getUsers = async () => {
    try {
      const response = await api.get<ListResponse<User>>('/usuarios')
      setUsers(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className="container mx-auto mt-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lista de Usuarios</h1>
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            Agregar Usuario
          </Button>
        </div>
        <UserList users={users} />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Añadir Usuario"
        size="xl"
      >
        <AddUser setIsOpen={setIsOpen} getUsers={getUsers} />
      </Modal>
    </>
  )
}

export default UsersPage
