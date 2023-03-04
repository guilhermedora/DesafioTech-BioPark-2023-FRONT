import { useEffect, useState } from 'react';
import AddCadasterModal from '../../components/AddCadasterModal';
import AddLocador from '../../components/AddLocador';
import Filter from '../../components/Filter';
import Header from '../../components/Header';
import Table from '../../components/Table';
import { loadApartments } from '../../utils/requisitions';
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
      console.log(allApartments, 'todos os apes');
      setApartments([...allApartments]);
    }
    getAllApartments();
    console.log('1');
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
              <button
                className='btn-blue btn-small'
                onClick={() => setOpenModalAddCadaster(true)}
              >
                Adicionar Imóvel
              </button>
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