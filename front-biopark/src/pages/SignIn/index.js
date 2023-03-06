import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-second-form.svg';
import Alert from '../../components/Alert';
import ButtonOpacity from '../../components/ButtonOpacity';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import './styles.css';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = getItem('token');
    if (token) navigate('/main')
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setAlertMsg("Todos os campos são obrigatórios.")
      msgAlert()
      return
    }
    try {
      const response = await api.post('/signin', {
        email,
        password,
      });
      const { user, token } = response.data;
      setItem('token', token);
      setItem('userId', user.id);
      setItem('userName', user.name);
      setItem('category', user.category)
      navigate('/main');
    } catch (error) {
      setAlertMsg(`${error.message}, try again.`)
      msgAlert()
    }
  }

  function msgAlert() {
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
      clearTimeout()
    }, 2000)
  }

  return (
    <div className='container-sign-in'>
      <a href='https://www.instagram.com/biopark_/'>
        <img src={Logo} alt="logo" className='logo' />
      </a>
      <div className='content-sign-in'>
        <div className='left'>
          <h1>
            Controle seus <span>imóveis </span>
            ou procure um lugar para  <span>morar</span>.
          </h1>
          <h3>
            Não importa o seu lado da moeda fechamos o melhor negócio
            para você! Com a BioPark você tem tudo num único lugar,
            há um clique de distância.  <span>;)</span>
          </h3>
          <ButtonOpacity
            click={() => navigate('/sign-up')}
            text={'Cadastre-se'}
            atributeSize={'btn-big'}
            atributeColor={'btn-red'}
            atributeLarge={'btn-whidth-login'}
          />
        </div>
        <div className='right'>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className='container-inputs'>
              <label htmlFor='email'>E-mail</label>
              <input
                type="text"
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='container-inputs'>
              <label htmlFor='password'>Password</label>
              <input
                type="password"
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <ButtonOpacity
              click={handleSubmit}
              text={'Entrar'}
              atributeSize={'btn-big'}
              atributeColor={'btn-red'}
              atributeLarge={'btn-whidth-login'}
            />
          </form>
        </div>
      </div>
      {
        alert &&
        <Alert
          style={{ top: "20%" }}
          msgAlert={alertMsg}
        />
      }
    </div>
  );
}

export default SignIn;
