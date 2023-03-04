import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-second-form.svg';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import './styles.css';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = getItem('token');

    if (token) {
      navigate('/main');
    }

  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!email || !password) {
        return;
      }
      console.log(email, password);
      const response = await api.post('/login', {
        email,
        senha: password
      });

      const { usuario, token } = response.data;

      setItem('token', token);
      setItem('userId', usuario.id);
      setItem('userName', usuario.nome);

      navigate('/main');

    } catch (error) {
      console.log(error);
    }


  }

  return (
    <div className='container-sign-in'>
      <img src={Logo} alt="logo" className='logo' />

      <div className='content-sign-in'>
        <div className='left'>
          <h1>
            Controle seus <span>imóveis</span> ou procure um lugar para morar.
          </h1>

          <h3>
            Não importa o seu lado da moeda fechamos o melhor negócio para você! Com a BioHome
            você tem tudo num único lugar, há um clique de distância. ;)
          </h3>

          <button
            className='btn-red btn-big'
            onClick={() => navigate('/sign-up')}
          >
            Cadastre-se
          </button>
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

            <button
              className='btn btn-red btn-big'
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
