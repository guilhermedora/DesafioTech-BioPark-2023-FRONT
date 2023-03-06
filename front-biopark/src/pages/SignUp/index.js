import './styles.css';
import Logo from '../../assets/logo-original.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import ButtonOpacity from '../../components/ButtonOpacity';
import Alert from '../../components/Alert';

const defaultForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  category: ''
}

function SignUp() {

  const navigate = useNavigate();
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [form, setForm] = useState({ ...defaultForm });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !form.name ||
        !form.email ||
        !form.password ||
        !form.confirmPassword ||
        form.category === 'Selecione'
      ) {
        setAlertMsg("Todos os campos são obrigatórios")
        msgAlert()
        return
      }
      if (form.password !== form.confirmPassword) {
        setAlertMsg("Senhas diferentes.")
        msgAlert()
        return
      }
      await api.post('/signup',
        {
          email: form.email,
          name: form.name,
          password: form.password,
          category: form.category
        }
      );
      navigate('/');
    } catch (error) {
      setAlertMsg(`${error.message}, try again.`)
      msgAlert()
    }
  }

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  function msgAlert() {
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
      clearTimeout()
    }, 2000)
  }

  return (
    <div className='container-sign-up'>
      <div className='content-sign-up'>
        <form onSubmit={handleSubmit}>
          <a href='https://www.instagram.com/biopark_/'>
            <img src={Logo} alt="logo" className='logo-cadastro' />
          </a>
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
            <label htmlFor='confirm-password'>
              Confirmação de senha
            </label>
            <input
              type="password"
              name='confirmPassword'
              onChange={handleChangeForm}
              value={form.confirmPassword}
            />
          </div>
          <ButtonOpacity
            click={handleSubmit}
            text={'Cadastrar'}
            atributeSize={'btn-big'}
            atributeColor={'btn-red'}
            atributeLarge={'btn-whidth-login'}
          />
          <Link to="/">
            Já tem cadastro? Clique aqui!
          </Link>
        </form>
      </div>
      {
        alert &&
        <Alert
          style={{ top: "20%" }}
          msgAlert={alertMsg}
        />
      }
    </div >
  );
}

export default SignUp;
