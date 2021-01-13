import React from 'react';
import UserListComponent from './components/user-list.component';
import RegisterComponent from './components/register.component';

import './styles/app.css'
import AskPermissionComponent from './components/ask-permission.component';

function App() {

  return (
    <div className="app">
      {
        localStorage.getItem('userId') === null ?
          <RegisterComponent /> : 
          (
            <>
              {
                Notification.permission !== 'granted' ?
                    <AskPermissionComponent /> : null
              }
              <UserListComponent />
            </>
          )
      }
    </div>
  );
}

export default App;
