import { useEffect, useState } from 'react';
import AddCadasterModal from '../../components/AddCadasterModal';
import AddLocador from '../../components/AddLocador';
import Filter from '../../components/Filter';
import Header from '../../components/Header';
import Table from '../../components/Table';
import { loadApartments } from '../../utils/requisitions';
import ButtonOpacity from '../../components/ButtonOpacity';
import './styles.css';

function Main() {
  const [setOpenModalProfile] = useState(false);
  const [openModalAddCadaster, setOpenModalAddCadaster] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [openModalLocador, setOpenModalLocador] = useState(false);
  const [apartmentClicked, setApartmentClicked] = useState({});
  useEffect(() => {
    setApartments([]);

    async function getAllApartments() {
      const allApartments = await loadApartments();
      setApartments([...allApartments]);
    }
    getAllApartments();
  }, []);

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
                apartamentList={apartments}
                setApartments={setApartments}
                setApartmentClicked={setApartmentClicked}
              />
            </div>
            <div className='container-right'>
              <ButtonOpacity
                atributeColor={'btn-blue'}
                click={() => setOpenModalAddCadaster(true)}
                text={'Adicionar Imóvel'}
              />
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
    </div>
  )
}

export default Main;