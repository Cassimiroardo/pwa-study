import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { signUpUserService } from '../service/api';

import '../styles/register.css'

const RegisterComponent: React.FC = () => {
  const [user, setUser] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setUser(event.target.value)
  
  const signUpUser = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault()
    const userId = await signUpUserService(user)
    localStorage.setItem('userId', String(userId))
    window.location.reload()
  }

  return (
  <form className="register-form">
    <input className="register-input" type="text" value={user} onChange={handleChange}/>
    <button type="submit" className="register-button" onClick={signUpUser}>Entrar</button>
  </form>
  );
}

export default RegisterComponent;