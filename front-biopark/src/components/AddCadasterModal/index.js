import Zoom from '@mui/material/Zoom';
import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import api from '../../services/api';
import { loadApartments, loadBuildings } from '../../utils/requisitions';
import { getItem } from '../../utils/storage';
import ButtonOpacity from '../ButtonOpacity';
import './styles.css';
import Alert from '../../components/Alert';

const defaultFormEdf = {
  building_name: '',
  address: '',
  description: '',
}

const defaultFormAp = {
  place_level: '',
  apartment_number: '',
  building_name: '',
  value_rent: '',
  description: '',
  available: true,
}

function AddCadasterModal({ open, handleClose, setApartments }) {

  const token = getItem('token');
  const [alert, setAlert] = useState(false)
  const [option, setOption] = useState('edf')
  const [alertMsg, setAlertMsg] = useState("")
  const [buildings, setBuildings] = useState([]);
  const [formAp, setFormAp] = useState({ ...defaultFormAp })
  const [formEdf, setFormEdf] = useState({ ...defaultFormEdf })

  useEffect(() => {
    async function getBuildings() {
      const allBuildings = await loadBuildings();
      setBuildings([...allBuildings]);
    }
    getBuildings();
  }, []);

  function handleChangeFormEdf({ target }) {
    setFormEdf({ ...formEdf, [target.name]: target.value });
  }

  function handleChangeFormAp({ target }) {
    setFormAp({ ...formAp, [target.name]: target.value });
  }

  function handleChangeSelectAp({ target }) {
    const currentBuilding = buildings.find(
      (building) => building.building_name === target.value
    );
    if (!currentBuilding) { return }
    setFormAp({ ...formAp, [target.name]: target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (option === 'edf') {
      if (!formEdf.building_name || !formEdf.address) {
        setAlertMsg("Preencha os campos obrigatórios.")
        msgAlert()
        return
      }
      try {
        const response = await api.post('/register-property',
          {
            type: 'edf',
            building_name: formEdf.building_name,
            address: formEdf.address,
            description: formEdf.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status > 204) {
          setAlertMsg(`${response.error}, try again. 1`)
          msgAlert()
          return
        }
        setFormEdf({ ...defaultFormEdf });
      } catch (error) {
        setAlertMsg(`${error.message}, try again.`)
        msgAlert()
      } finally {
        handleClose();
        document.location.reload(true)
      }
    } else if (option === 'ap') {
      if (
        !formAp.place_level ||
        !formAp.apartment_number ||
        !formAp.building_name
      ) {
        setAlertMsg("Preencha os campos obrigatórios.")
        msgAlert()
        return
      }
      try {
        const response = await api.post('/register-property',
          {
            type: 'ap',
            place_level: formAp.place_level,
            apartment_number: formAp.apartment_number,
            building_name: formAp.building_name,
            value_rent: formAp.value_rent,
            description: formAp.description,
            available: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status > 204) {
          setAlertMsg(`${response.error}, try again. 2`)
          msgAlert()
          return
        }
        const allApartments = await loadApartments();
        if (response.status > 204) {
          setAlertMsg(`${response.error}, try again. 3`)
          msgAlert()
          return
        }
        setFormAp({ ...defaultFormAp });
        setApartments([...allApartments]);
      } catch (error) {
        setAlertMsg(`${error.message}, try again.`)
        msgAlert()
      } finally {
        handleClose();
        document.location.reload(true)
      }
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
            in={open}
            style={{ transitionDelay: open ? '50ms' : '0ms' }}
          >
            <div className='modal'>
              <img
                className='close-button'
                src={CloseIcon}
                alt="close-button"
                onClick={handleClose}
              />
              <h2>Adicionar Imóvel</h2>
              <div className='container-options'>
                <ButtonOpacity
                  text={'Edificio'}
                  click={() => setOption('edf')}
                  atributeColor={
                    `${option === 'ap'
                      ? 'option-off'
                      : 'option-edf'}`
                  }
                  atributeSize={'btn-big'}
                  atributeLarge={'btn-whidth-med'}
                />
                <ButtonOpacity
                  text={'Apartamento'}
                  click={() => setOption('ap')}
                  atributeColor={
                    `${option === 'ap'
                      ? 'option-ap'
                      : 'option-off'}`
                  }
                  atributeSize={'btn-big'}
                  atributeLarge={'btn-whidth-med'}
                />
              </div>
              {
                option === 'ap' &&
                <>
                  <form onSubmit={handleSubmit}>
                    <div className='container-inputs'>
                      <label>Edifício</label>
                      <select
                        name='building_name'
                        onChange={handleChangeSelectAp}
                        value={formAp.building_name.name}
                        required
                      >
                        <option>Selecione</option>
                        {
                          buildings.map((build) => (
                            <option
                              key={build.id}
                              value={build.building_name}
                            >
                              {build.building_name}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='container-inputs-row'>
                      <div>
                        <label>Andar</label>
                        <input
                          className='inp-row'
                          name='place_level'
                          type="number"
                          value={formAp.place_level}
                          onChange={handleChangeFormAp}
                          required
                        />
                      </div>
                      <div>
                        <label>Número</label>
                        <input
                          className='inp-row'
                          name='apartment_number'
                          type="number"
                          value={formAp.apartment_number}
                          onChange={handleChangeFormAp}
                          required
                        />
                      </div>
                    </div>
                    <div className='container-inputs'>
                      <label>Valor</label>
                      <input
                        name='value_rent'
                        type="number"
                        value={formAp.value_rent}
                        onChange={handleChangeFormAp}
                        required
                      />
                    </div>
                    <div className='container-inputs'>
                      <label>Descrição</label>
                      <input
                        name='description'
                        type="text"
                        value={formAp.description}
                        onChange={handleChangeFormAp}
                        required
                      />
                    </div>
                    <ButtonOpacity
                      click={handleSubmit}
                      text={'Adicionar Apartamento'}
                      atributeColor={'btn-red'}
                      atributeSize={'btn-small'}
                      atributeLarge={'btn-whidth-big'}
                    />
                  </form>
                </>
              }
              {
                option === 'edf' &&
                <>
                  <form onSubmit={handleSubmit}>
                    <div className='container-inputs'>
                      <label>Nome</label>
                      <input
                        name='building_name'
                        type="text"
                        value={formEdf.building_name}
                        onChange={handleChangeFormEdf}
                        required
                      />
                    </div>
                    <div className='container-inputs'>
                      <label>Endereço</label>
                      <input
                        name='address'
                        type="text"
                        value={formAp.address}
                        onChange={handleChangeFormEdf}
                        required
                      />
                    </div>
                    <div className='container-inputs'>
                      <label>Descrição</label>
                      <input
                        name='description'
                        type="text"
                        value={formEdf.description}
                        onChange={handleChangeFormEdf}
                        required
                      />
                    </div>
                    <ButtonOpacity
                      click={handleSubmit}
                      text={'Adicionar Edifício'}
                      atributeColor={'btn-blue'}
                      atributeSize={'btn-small'}
                      atributeLarge={'btn-whidth-big'}
                    />
                  </form>
                </>
              }
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

export default AddCadasterModal;