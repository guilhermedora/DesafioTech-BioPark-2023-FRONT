import Zoom from '@mui/material/Zoom';
import { useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import Alert from '../../components/Alert';
import api from '../../services/api';
import { formatPhone, formatToDate } from '../../utils/formatters';
import { getItem } from '../../utils/storage';
import ButtonOpacity from '../ButtonOpacity';
import './styles.css';

const defaultForm = {
  renter_name: '',
  renter_email: '',
  renter_phone: '',
  date_start: '',
  month_number: ''
}

function AddLocador({
  open,
  handleClose,
  apartmentClicked
}) {
  const id = getItem('userId')
  const token = getItem('token');
  const category = getItem('category');
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [form, setForm] = useState({ ...defaultForm })

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let localApartmentClicked = Object.keys(apartmentClicked).map(
      (info) => [info, apartmentClicked[info]]
    )
    localApartmentClicked.map((info) => {
      if (info[0] === 'owner_id') {
        info[1] = id
      }
    })
    const objLocalAp = Object.fromEntries(localApartmentClicked)
    if (
      !form.renter_name ||
      !form.renter_email ||
      !form.renter_phone ||
      !form.date_start ||
      !form.month_number
    ) {
      setAlertMsg("Preencha os campos obrigatórios.")
      msgAlert()
      return
    }
    try {
      if (category === "Locatário") {
        const response = await api.post('/open-contract',
          {
            name: form.renter_name,
            email: form.renter_email,
            renter_phone: form.renter_phone,
            date_start: form.date_start,
            month_number: form.month_number,
            ...apartmentClicked
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status > 204) {
          setAlertMsg(`${response.error}, try again. 4`)
          msgAlert()
          return
        }
        setForm({ ...defaultForm });
      } else {
        const response = await api.post('/open-contract',
          {
            name: form.renter_name,
            email: form.renter_email,
            renter_phone: form.renter_phone,
            date_start: form.date_start,
            month_number: form.month_number,
            owner_id: id,
            ...objLocalAp
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status > 204) {
          setAlertMsg(`${response.error}, try again. 5`)
          msgAlert()
          return
        }
        setForm({ ...defaultForm });
      }
    } catch (error) {
      setAlertMsg(`${error.message}, try again.`)
      msgAlert()
    } finally {
      handleClose();
      document.location.reload(true)
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
    <>
      {open &&
        <div className='backdrop'>
          <Zoom
            in={open} style={{
              transitionDelay: open
                ? '50ms'
                : '0ms'
            }}
          >
            <div className='modal'>
              <img
                className='close-button'
                src={CloseIcon}
                alt="close-button"
                onClick={handleClose}
              />
              <h2>{
                category === 'Locatário'
                  ? `Requerimento de Contrato`
                  : `Contrato de Aluguel`
              }</h2>
              <form onSubmit={handleSubmit}>
                <div className='container-inputs'>
                  <label>Nome</label>
                  <input
                    name='renter_name'
                    type="text"
                    value={form.renter_name}
                    onChange={handleChangeForm}
                    required
                  />
                </div>
                <div className='container-inputs'>
                  <label>E-mail</label>
                  <input
                    name='renter_email'
                    type="email"
                    value={form.renter_email}
                    onChange={handleChangeForm}
                    required
                  />
                </div>
                <div className='container-inputs'>
                  <label>Telefone</label>
                  <input
                    name='renter_phone'
                    type="text"
                    value={formatPhone(form.renter_phone)}
                    onChange={handleChangeForm}
                    required
                  />
                </div>
                <div className='container-inputs'>
                  <label>Data de Inicio</label>
                  <input
                    name='date_start'
                    type="text"
                    value={formatToDate(form.date_start)}
                    onChange={handleChangeForm}
                    maxLength={10}
                    required
                  />
                </div>
                <div className='container-inputs'>
                  <label>Periodo de Contrato</label>
                  <input
                    name='month_number'
                    type="text"
                    value={form.month_number}
                    onChange={handleChangeForm}
                    required
                  />
                </div>
                <ButtonOpacity
                  click={handleSubmit}
                  text={
                    category === 'Locatário'
                      ? `Encaminhar Requerimento`
                      : `Entregar Chaves`
                  }
                  atributeColor={'btn-red'}
                  atributeSize={'btn-small'}
                  atributeLarge={'btn-whidth-big'}
                />
              </form>
            </div>
          </Zoom>
          {
            alert &&
            <Alert
              style={{ top: "20%" }}
              msgAlert={alertMsg}
            />
          }
        </div>
      }
    </>
  )
}

export default AddLocador;