import './styles.css';
import Logo from '../../assets/logo-original.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const defaultForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  category: ''
}

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ ...defaultForm });

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        return;
      }

      if (form.password !== form.confirmPassword) {
        return;
      }

      const response = await api.post('/usuario',
        {
          email: form.email,
          nome: form.name,
          senha: form.password,
          atributo: form.category
        }
      );

      if (response.status > 204) {
        return;
      }

      navigate('/');

    } catch (error) {
      console.log(error.response);
    }
  }

  function handleChangeForm({ target }) {
    console.log(target.value);
    setForm({ ...form, [target.name]: target.value });
  }

  return (
    <div className='container-sign-up'>


      <div className='content-sign-up'>

        <form onSubmit={handleSubmit}>
          <img src={Logo} alt="logo" className='logo-cadastro' />
          <div className='container-inputs'>

            <label htmlFor='name'>Nome</label>
            <input
              type="text"
              name='name'
              value={form.name}
              onChange={handleChangeForm}
            />
          </div>

          <div className='container-inputs'>
            <label htmlFor='email'>E-mail</label>
            <input
              type="text"
              name='email'
              value={form.email}
              onChange={handleChangeForm}
            />
          </div>

          <div className='container-inputs'>
            <label>Categoria</label>

            <select
              name='category'
              value={form.category.name}
              onChange={handleChangeForm}
              required
            >
              <option>Selecione</option>
              <option>Locador</option>
              <option>Locatário</option>
            </select>

          </div>

          <div className='container-inputs'>
            <label htmlFor='password'>Senha</label>
            <input
              type="password"
              name='password'
              value={form.password}
              onChange={handleChangeForm}
            />
          </div>

          <div className='container-inputs'>
            <label htmlFor='confirm-password'>Confirmação de senha</label>
            <input
              type="password"
              name='confirmPassword'
              value={form.confirmPassword}
              onChange={handleChangeForm}
            />
          </div>

          <button
            className='btn btn-red btn-big'
          >
            Cadastrar
          </button>
          <Link to="/">Já tem cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div >
  );
}

export default SignUp;
