import './styles.css';
import { getItem } from '../../utils/storage';
import api from '../../services/api'
import { useState } from 'react';

function Confirm({ open, handleClose, infoAp }) {
  const token = getItem('token');
  const [yes, setYes] = useState(false)
  const [locador, setLocador] = useState({
    email: ''
  })

  async function handleDeleteItem() {
    try {
      await api.post('/fechar-contrato',
        {
          orderFrom: locador.email,
          ...infoAp
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      document.location.reload(true)
    }
  }

  function handleChangeMail({ target }) {
    setLocador({ ...locador, [target.name]: target.value });
  }

  return (
    <>
      {open &&
        <div className='container-confirm'>
          <div className='arrow-up'>
          </div>
          <span>Deseja Cancelar o contrato?</span>
          {yes &&
            <input
              className='confirm'
              placeholder='Email do locatário'
              name='email'
              type="test"
              value={locador.email}
              onChange={handleChangeMail}
              required
            />
          }
          <div className='container-buttons'>
            <button
              className='btn-dialog btn-blue'
              onClick={() => { !yes ? setYes(true) : handleDeleteItem() }}
            >
              {!yes ? `Sim` : `Enviar`}
            </button>
            <button
              onClick={() => { { yes ? setYes(false) : handleClose() } }}
              className="btn-dialog btn-red"
            >
              {!yes ? `Não` : `Cancelar`}
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default Confirm;