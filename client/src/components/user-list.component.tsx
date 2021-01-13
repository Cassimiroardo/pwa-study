import React, { useEffect, useState } from 'react';
import { getAllUsers, sendNotification } from '../service/api';

import '../styles/user-list.css'

interface UserItemProp {
  user: {id: number, user: string}
}

const UserItemComponent: React.FC<UserItemProp> = ({ user }) => {

  const handleSendNotification = () => {
    sendNotification(user.id, Number(localStorage.getItem('userId')))
  }

  return (
    <div className="item-container">
      <h3 className="item-name">{user.user}</h3>
      <button className="item-notification-button" onClick={handleSendNotification}>Dizer ola</button>
    </div>
  )
}

const UserListComponent: React.FC = () => {
  const [users, setUsers] = useState<{id: number, user: string}[]>([])

  useEffect(() => {
    (async function anyNameFunction() {
      const users = await getAllUsers();
      setUsers(users)
    })()
  },[])

  return (
    <div className="list-container">
      {users.map((user, index) => user.id !== Number(localStorage.getItem('userId')) ?
      <UserItemComponent user={user} key={index}/> : null
      )}
    </div>
  );
}

export default UserListComponent;