import { useEffect, useState } from 'react';
import AddCadasterModal from '../../components/AddCadasterModal';
import AddLocador from '../../components/AddLocador';
import ButtonOpacity from '../../components/ButtonOpacity';
import ContractRequire from '../../components/ContractRequire';
import CopyContract from '../../components/CopyContract';
import Filter from '../../components/Filter';
import Header from '../../components/Header';
import Resume from '../../components/Resume';
import Table from '../../components/Table';
import {
  loadApartments,
  loadContracts,
  requiredContracts
} from '../../utils/requisitions';
import { getItem } from '../../utils/storage';
import './styles.css';

function Main() {

  const category = getItem('category')
  const [require, setRequire] = useState([]);
  const [setOpenModalProfile] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [openContract, setOpenContract] = useState(false);
  const [apartmentClicked, setApartmentClicked] = useState({});
  const [openModalLocador, setOpenModalLocador] = useState(false);
  const [openModalAddCadaster, setOpenModalAddCadaster] = useState(false);

  useEffect(() => {
    getAllApartments();
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
    if (response) {
      let allRequirements = [...response]
      setRequire(allRequirements);
    }
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