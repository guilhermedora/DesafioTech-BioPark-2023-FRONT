import './styles.css';
import api from '../../services/api'
import { getItem } from '../../utils/storage';
import CloseIcon from '../../assets/close-icon.svg'
import Alert from '../../components/Alert';
import { useState } from 'react';

function ConfirmRequest({ open, handleClose, info }) {
  const token = getItem('token');
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  async function handleDeleteItem() {
    if (
      !info[0].renter_id ||
      !info[0].renter_name ||
      !info[0].renter_email ||
      !info[0].renter_phone
    ) {
      setAlertMsg("Erro interno.")
      msgAlert()
      return
    }
    try {
      await api.post('/close-requirement',
        {
          id: info[0].id,
          renter_id: info[0].renter_id,
          renter_name: info[0].renter_name,
          renter_email: info[0].renter_email,
          renter_phone: info[0].renter_phone,
          owner_id: info[0].owner_id,
          building_name: info[0].building_name,
          apartment_number: info[0].apartment_number,
          value_rent: info[0].value_rent,
          date_start: info[0].date_start,
          month_number: info[0].month_number,
          status: info[0].status,
          required: info[0].required
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
    } finally {
      handleClose();
      document.location.reload(true)
    }
  }
  async function handleSubmit() {
    if (
      !info[0].renter_id ||
      !info[0].renter_name ||
      !info[0].renter_email ||
      !info[0].renter_phone
    ) {
      setAlertMsg("Erro interno.")
      msgAlert()
      return
    }
    try {
      await api.post('/open-contract',
        {
          id: info[0].id,
          renter_id: info[0].renter_id,
          name: info[0].renter_name,
          email: info[0].renter_email,
          renter_phone: info[0].renter_phone,
          owner_id: info[0].owner_id,
          building_name: info[0].building_name,
          apartment_number: info[0].apartment_number,
          value_rent: info[0].value_rent,
          date_start: info[0].date_start,
          month_number: info[0].month_number,
          status: info[0].status,
          required: info[0].required
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      handleDeleteItem()
    } catch (error) {
      console.log(error.message);
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
        <div className='container-confirm-request'>
          <img
            className='close-button'
            alt="close-button"
            onClick={handleClose}
            src={CloseIcon}
          />
          <span>Aceitar solicitação?</span>
          <div className='container-buttons'>
            <button
              className='btn-dialog btn-blue'
              onClick={() => { handleSubmit() }}
            >
              Sim
            </button>
            <button
              onClick={() => { handleDeleteItem() }}
              className="btn-dialog btn-red"
            >
              Não
            </button>
          </div>
        </div>
      }
      {
        alert &&
        <Alert
          style={{ top: "20%" }}
          msgAlert={alertMsg}
        />
      }
    </>
  )
}

export default ConfirmRequest;