import './styles.css';
import { getItem } from '../../utils/storage';
import api from '../../services/api'
import { useState } from 'react';
import Alert from '../../components/Alert';

function Confirm({ open, handleClose, infoAp }) {
  const token = getItem('token');
  const [yes, setYes] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [locador, setLocador] = useState({
    email: ''
  })

  async function handleDeleteItem() {
    if (!locador.email || locador.email.length <= 5) {
      setAlertMsg("Preencha o campo é obrigatórios.")
      msgAlert()
      return
    }
    try {
      const response = await api.post('/close-contract',
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
      if (response.status > 204) {
        setAlertMsg(`${response.error}, try again.`)
        msgAlert()
        return
      }
      setLocador({ email: '' })
    } catch (error) {
      console.log(error.message);
    } finally {
      document.location.reload(true)
      handleClose();
    }
  }

  function handleChangeMail({ target }) {
    setLocador({ ...locador, [target.name]: target.value });
  }

  function msgAlert() {
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
      clearTimeout()
    }, 2000)
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
              type="email"
              value={locador.email}
              onChange={handleChangeMail}
              required
            />
          }
          <div className='container-buttons'>
            <button
              className='btn-dialog btn-blue'
              onClick={() => {
                !yes
                  ? setYes(true)
                  : handleDeleteItem()
              }}
            >
              {!yes ? `Sim` : `Enviar`}
            </button>
            <button
              onClick={() => {
                yes
                  ? setYes(false)
                  : handleClose()
              }}
              className="btn-dialog btn-red"
            >
              {!yes ? `Não` : `Cancelar`}
            </button>
          </div>
        </div>
      }
      {
        alert &&
        <Alert
          style={{ top: "10%" }}
          msgAlert={alertMsg}
        />
      }
    </>
  )
}

export default Confirm;