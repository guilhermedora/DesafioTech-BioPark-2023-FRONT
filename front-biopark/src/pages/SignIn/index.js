import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-second-form.svg';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import './styles.css';
import ButtonOpacity from '../../components/ButtonOpacity';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = getItem('token');
    if (token) navigate('/main')
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!email || !password) return
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
      console.log(error);
    }
  }

  return (
    <div className='container-sign-in'>
      <a href='https://www.instagram.com/biopark_/'>
        <img src={Logo} alt="logo" className='logo' />
      </a>

      <div className='content-sign-in'>
        <div className='left'>
          <h1>
            Controle seus <span>imóveis</span>
            ou procure um lugar para morar.
          </h1>
          <h3>
            Não importa o seu lado da moeda fechamos o melhor negócio
            para você! Com a BioHome você tem tudo num único lugar,
            há um clique de distância. ;)
          </h3>
          <ButtonOpacity
            click={() => navigate('/sign-up')}
            text={'Cadastre-se'}
            atributeColor={'btn-red'}
            atributeSize={'btn-big'}
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
              atributeColor={'btn-red'}
              atributeSize={'btn-big'}
              atributeLarge={'btn-whidth-login'}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
