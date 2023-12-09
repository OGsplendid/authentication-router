import { useEffect, useState } from "react";
import { Form } from "../Form/Form"
import { Logo } from "../Logo/Logo"
import { LogoutWidget } from "../LogoutWidget/LogoutWidget"
import { IForm, IError, IState } from '../../../types.ts'
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [form, setForm] = useState<IForm>({
    login: '',
    password: '',
  });
  const [error, setError] = useState<IError>({
    exists: false,
    message: '',
  });
  const [profile, setProfile] = useState<IState | undefined>();
  const [displayIntro, setDisplayIntro] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError((prev) => ({
      ...prev,
      exists: false,
      message: '',
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.login.trim() || !form.password.trim()) return;
    fetch('http://localhost:7070/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.token) {
          setError((prev) => ({
            ...prev,
            exists: true,
            message: data.message,
          }))
          return;
        } else {
          localStorage.setItem('token', data.token);
        }
        return data.token;
      })
      .then((token) => {
        requestProfile(token);
      })
  }

  async function requestProfile(token: string) {
    try {
      const response = await fetch('http://localhost:7070/private/me', {
        method: 'GET',
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      })
      const data = await response.json();
      setProfile(data);
      setDisplayIntro(false);
      setForm({login: '', password: ''});
      navigate('/news');
    } catch(e) {
        console.log(e)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setDisplayIntro(true);
    navigate('/');
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      requestProfile(storedToken);
    }
  }, []);

  return (
    <div className='header-container'>
        <Logo title={'Neto Social'} />
        {displayIntro && <Form login={form.login} password={form.password} onChange={handleChange} onSubmit={handleSubmit} />}
        {!displayIntro && <LogoutWidget profile={profile} onClick={handleLogout} />}
        {error.exists && <h3 className="error">{error.message}</h3>}
    </div>
  )
}
