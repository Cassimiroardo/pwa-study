import React from 'react';
import ButtonsComponent from './components/buttons.component';
import RegisterComponent from './components/register.component';

function App() {
  return (
    <div>
      {
        localStorage.getItem('user') === null ?
          <RegisterComponent /> : <ButtonsComponent />
      }
    </div>
  );
}

export default App;
