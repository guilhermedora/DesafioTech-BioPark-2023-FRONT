import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import api from '../../services/api';
import { loadBuildings } from '../../utils/requisitions';
import { getItem } from '../../utils/storage';
import './styles.css';
import { formatToDate, formatPhone } from '../../utils/formatters'

const defaultForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  vigencia: ''
}

function AddLocador({ open, handleClose, setApartments, apartmentClicked }) {
  const token = getItem('token');
  const [setBuildings] = useState([]);
  const [form, setForm] = useState({ ...defaultForm })

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(form, apartmentClicked);
    try {
      await api.post('/contrato',
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          vigencia: form.vigencia,
          ...apartmentClicked
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      handleClose();
      setForm({ ...defaultForm });
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    async function getBuildings() {
      const allBuildings = await loadBuildings();
      console.log(allBuildings);
      setBuildings([...allBuildings]);
    }
    getBuildings();
  }, []);

  return (
    <>
      {open &&
        <div className='backdrop'>
          <div className='modal'>
            <img
              className='close-button'
              src={CloseIcon}
              alt="close-button"
              onClick={handleClose}
            />
            <h2>Contrato de Aluguel</h2>
            <form onSubmit={handleSubmit}>
              <div className='container-inputs'>
                <label>Nome</label>
                <input
                  name='name'
                  type="text"
                  value={form.name}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className='container-inputs'>
                <label>E-mail</label>
                <input
                  name='email'
                  type="email"
                  value={form.email}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className='container-inputs'>
                <label>Telefone</label>
                <input
                  name='phone'
                  type="text"
                  value={formatPhone(form.phone)}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className='container-inputs'>
                <label>Data de Inicio</label>
                <input
                  name='date'
                  type="text"
                  value={formatToDate(form.date)}
                  onChange={handleChangeForm}
                  maxLength={10}
                  required
                />
              </div>
              <div className='container-inputs'>
                <label>Periodo de Contrato</label>
                <input
                  name='vigencia'
                  type="text"
                  value={form.vigencia}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <button className='btn-red btn-small'>
                Entregar Chaves
              </button>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default AddLocador;