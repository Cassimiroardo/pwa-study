import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../service/api';

import '../styles/user-list.css'

interface UserItemProp {
  user: string
}

const UserItemComponent: React.FC<UserItemProp> = ({user}) => {
  return (
    <div className="item-container">
      <h3 className="item-name">{user}</h3>
      <button className="item-notification-button">Dizer ola</button>
    </div>
  )
}

const UserListComponent: React.FC = () => {
  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    (async function anyNameFunction() {
      const users = await getAllUsers();
      setUsers(users)
    })()
  },[])

  return (
    <div className="list-container">
      {users.map((user, index) => <UserItemComponent user={user} key={index}/>)}
    </div>
  );
}

export default UserListComponent;