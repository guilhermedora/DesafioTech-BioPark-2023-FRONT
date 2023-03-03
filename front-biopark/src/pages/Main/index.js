import { useEffect, useState } from 'react';
import AddCadasterModal from '../../components/AddCadasterModal';
import Header from '../../components/Header';
import Table from '../../components/Table';
import { loadApartments } from '../../utils/requisitions';
import './styles.css';

function Main() {
  const [openModalAddCadaster, setOpenModalAddCadaster] = useState(false);
  const [setOpenModalProfile] = useState(false);
  const [apartments, setApartments] = useState([]);

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
              <Table
                apartamentList={apartments}
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
    </div>
  )
}

export default Main;