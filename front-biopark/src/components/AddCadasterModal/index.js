import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import api from '../../services/api';
import { loadBuildings, loadApartments } from '../../utils/requisitions';
import { getItem } from '../../utils/storage';
import ButtonOpacity from '../ButtonOpacity';
import './styles.css';
import Zoom from '@mui/material/Zoom';

const defaultFormEdf = {
  name: '',
  address: '',
  description: '',
}

const defaultFormAp = {
  floor: '',
  number: '',
  building: '',
  value: '',
  description: '',
  available: true,
}

function AddCadasterModal({ open, handleClose, setApartments }) {
  const token = getItem('token');
  const [option, setOption] = useState('edf');
  const [buildings, setBuildings] = useState([]);
  const [formEdf, setFormEdf] = useState({ ...defaultFormEdf })
  const [formAp, setFormAp] = useState({ ...defaultFormAp })

  function handleChangeFormEdf({ target }) {
    setFormEdf({ ...formEdf, [target.name]: target.value });
  }

  function handleChangeFormAp({ target }) {
    setFormAp({ ...formAp, [target.name]: target.value });
  }

  function handleChangeSelectAp({ target }) {
    const currentBuilding = buildings.find((building) => building.edificio_nome === target.value);
    if (!currentBuilding) {
      return;
    }
    setFormAp({ ...formAp, [target.name]: target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (option === 'edf') {
      try {
        await api.post('/propriedade',
          {
            type: 'edf',
            name: formEdf.name,
            address: formEdf.address,
            description: formEdf.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        handleClose();
        setFormEdf({ ...defaultFormEdf });
        document.location.reload(true)
      } catch (error) {
        console.log(error.response);
      }
    } else if (option === 'ap') {
      try {
        await api.post('/propriedade',
          {
            type: 'ap',
            floor: formAp.floor,
            number: formAp.number,
            building: formAp.building,
            value: formAp.value,
            description: formAp.description,
            available: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        handleClose();
        setFormAp({ ...defaultFormAp });
        const allApartments = await loadApartments();
        setApartments([...allApartments]);
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  useEffect(() => {
    async function getBuildings() {
      const allBuildings = await loadBuildings();
      setBuildings([...allBuildings]);
    }
    getBuildings();
  }, []);

  return (
    <>
      {open &&
        <div className='backdrop'>
          <Zoom
            in={open} style={{ transitionDelay: open ? '50ms' : '0ms' }}
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

              {option === 'ap' && <>
                <form onSubmit={handleSubmit}>

                  <div className='container-inputs'>
                    <label>Edifício</label>

                    <select
                      name='building'
                      value={formAp.building.name}
                      onChange={handleChangeSelectAp}
                      required
                    >
                      <option>Selecione</option>
                      {buildings.map((build) => (
                        <option
                          key={build.id}
                          value={build.edificio_nome}
                        >
                          {build.edificio_nome}
                        </option>
                      ))}
                    </select>

                  </div>

                  <div className='container-inputs-row'>
                    <div>
                      <label>Andar</label>
                      <input
                        className='inp-row'
                        name='floor'
                        type="number"
                        value={formAp.floor}
                        onChange={handleChangeFormAp}
                        required
                      />
                    </div>
                    <div>
                      <label>Número</label>
                      <input
                        className='inp-row'
                        name='number'
                        type="number"
                        value={formAp.number}
                        onChange={handleChangeFormAp}

                        required
                      />
                    </div>
                  </div>

                  <div className='container-inputs'>
                    <label>Valor</label>
                    <input
                      name='value'
                      type="number"
                      value={formAp.value}
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
              </>}
              {option === 'edf' && <>
                <form onSubmit={handleSubmit}>
                  <div className='container-inputs'>
                    <label>Nome</label>
                    <input
                      name='name'
                      type="text"
                      value={formEdf.name}
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
              </>}
            </div>
          </Zoom>
        </div>
      }
    </>
  )
}

export default AddCadasterModal;