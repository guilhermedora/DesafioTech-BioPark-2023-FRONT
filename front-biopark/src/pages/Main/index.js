import { useEffect, useState } from 'react';
import AddCadasterModal from '../../components/AddCadasterModal';
import AddLocador from '../../components/AddLocador';
import Filter from '../../components/Filter';
import Header from '../../components/Header';
import Table from '../../components/Table';
import {
  loadApartments,
  loadContracts,
  requiredContracts
} from '../../utils/requisitions';
import ButtonOpacity from '../../components/ButtonOpacity';
import './styles.css';
import { getItem } from '../../utils/storage';
import Resume from '../../components/Resume';
import ContractRequire from '../../components/ContractRequire'
import CopyContract from '../../components/CopyContract';

function Main() {
  const category = getItem('category')
  const [setOpenModalProfile] = useState(false);
  const [openContract, setOpenContract] = useState(false);
  const [openModalAddCadaster, setOpenModalAddCadaster] = useState(false);
  const [openModalLocador, setOpenModalLocador] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [require, setRequire] = useState([]);
  const [apartmentClicked, setApartmentClicked] = useState({});

  useEffect(() => {
    setApartments([])
    setContracts([])
    setRequire([])
    if (apartments.length < 1) getAllApartments();
    getAllRequirements();
    getAllMyContracts();
  }, []);

  async function getAllApartments() {
    const response = await loadApartments();
    let allApartments = [...response]
    setApartments(allApartments);
  }
  async function getAllMyContracts() {
    const response = await loadContracts();
    let allContracts = [...response]
    setContracts(allContracts);
  }
  async function getAllRequirements() {
    const response = await requiredContracts();
    let allRequirements = [...response]
    console.log(allRequirements, '@@@');
    setRequire(allRequirements);
  }

  return (
    <div className='container-main'>
      <Header
        handleEditProfile={() => setOpenModalProfile(true)}
      />
      <section>
        <div className='width-limit'>
          <div className='container-data'>
            <div className='container-left'>
              <Filter
                apartamentList={apartments}
                setApartments={setApartments}
              />
              <Table
                open={() => setOpenModalLocador(true)}
                handleOpen={() => setOpenContract(!openContract)}
                openContract={openContract}
                apartamentList={apartments}
                setApartments={setApartments}
                setApartmentClicked={setApartmentClicked}
              />
            </div>
            <div className='container-right'>
              {category == 'Locador'
                ? <>
                  <ButtonOpacity
                    atributeColor={'btn-blue'}
                    click={() => setOpenModalAddCadaster(true)}
                    text={'Adicionar Imóvel'}
                    atributeSize={'btn-whidth-login'}
                  />
                  <ContractRequire
                    contracts={require}
                  />
                </>
                : <Resume
                  contracts={contracts}
                />
              }
            </div>
          </div>
        </div>
      </section>

      <AddCadasterModal
        open={openModalAddCadaster}
        handleClose={() => setOpenModalAddCadaster(false)}
        setApartments={setApartments}
      />

      <AddLocador
        open={openModalLocador}
        handleClose={() => setOpenModalLocador(false)}
        setApartments={setApartments}
        apartmentClicked={apartmentClicked}
      />

      <CopyContract
        open={openContract}
        handleClose={() => setOpenContract(false)}
        apartmentClicked={apartmentClicked}
      />
    </div>
  )
}

export default Main;