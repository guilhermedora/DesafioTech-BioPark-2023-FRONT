import { useEffect, useState } from 'react';
import ArrowDown from '../../assets/arrow-down.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import Eye from '../../assets/eye.png';
import File from '../../assets/file.png';
import Keys from '../../assets/key-pb.png';
import Pen from '../../assets/pen.png';
import Confirm from '../../components/Confirm';
import { formatToMoney } from '../../utils/formatters';
import { getItem } from '../../utils/storage';
import './styles.css';

function Table({
  open,
  apartamentList,
  setApartments,
  setApartmentClicked,
  handleOpen,
  openContract
}) {

  const [asc, setAsc] = useState(true);
  const [orderedApartments, setOrderedApartments] = useState([]);
  const [cancelPop, setCancelPop] = useState(false)
  const [itemCancel, setItemCancel] = useState('')
  const category = getItem('category')

  useEffect(() => {
    let localApartments = [...apartamentList];
    if (asc) {
      localApartments.sort((a, b) => a.apartment_number - b.apartment_number);
      setOrderedApartments([...localApartments]);
    } else if (!asc) {
      localApartments.sort((a, b) => b.apartment_number - a.apartment_number);
      setOrderedApartments([...localApartments]);
    }
  }, [apartamentList, asc]);

  return (
    <div className='container-table'>
      <div className='table-head'>
        <div
          className='table-column-small content-number'
          onClick={() => setAsc(!asc)}
        >
          <strong>Nª do Apartamento</strong>
          <img
            src={asc ? ArrowUp : ArrowDown}
            alt="order"
          />
        </div>
        <strong className='table-column-small'>Andar</strong>
        <strong className='table-column-big'>Edifício</strong>
        <strong className='table-column-small'>Valor</strong>
        <strong className='table-column-big'>Status</strong>
      </div>
      <div className='table-body'>
        {orderedApartments.map((apartment, index) => (
          <div className='table-row' key={index}>
            <strong
              className='table-column-small content-number'
            >
              {apartment.apartment_number}
            </strong>
            <span
              className='table-column-small'
            >
              {apartment.place_level}
            </span>
            <span
              className='table-column-big'
            >
              {apartment.building_name}
            </span>

            <strong
              className={`table-column-small values `}
            >
              {formatToMoney(apartment.value_rent)}
            </strong>
            {
              category === 'Locador'
                ? <span
                  className={`table-column-big 
                ${apartment.available
                      ? 'positive-value'
                      : 'negative-value'}`
                  }
                >
                  {apartment.available ? `Disponível` : `Indisponível`}
                  {(!apartment.available)
                    ? <>
                      <img
                        className="img-eye"
                        src={Eye}
                        onClick={() => {
                          setApartmentClicked(apartment)
                          handleOpen(!openContract)
                        }}
                      />
                      <img
                        className="img-key"
                        src={Keys}
                        onClick={() => {
                          setItemCancel(apartment)
                          setCancelPop(true)
                        }}
                      />
                    </>
                    : <img
                      className="img-pen"
                      src={Pen}
                      onClick={() => {
                        open()
                        setApartmentClicked(apartment)
                      }}
                    />
                  }
                </span>
                : <span className={`table-column-big positive-value`}>
                  {`Disponível`}
                  <img
                    className="img-file"
                    src={File}
                    onClick={() => {
                      open()
                      setApartmentClicked(apartment)
                    }}
                  />
                </span>
            }
            <Confirm
              open={cancelPop && itemCancel.id === apartment.id}
              handleClose={() => setCancelPop(false)}
              infoAp={itemCancel}
            />
          </div>
        ))}
      </div>
    </div >
  )
}

export default Table;