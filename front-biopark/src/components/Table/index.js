import { useEffect, useState } from 'react';
import ArrowDown from '../../assets/arrow-down.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import { formatToMoney } from '../../utils/formatters';
import './styles.css';

function Table({
  open,
  apartamentList,
  setApartments,
  setApartmentClicked
}) {
  const [asc, setAsc] = useState(true);
  const [orderedApartments, setOrderedApartments] = useState([]);

  useEffect(() => {
    let localApartments = [...apartamentList];
    if (asc) {
      localApartments.sort((a, b) => a.numero - b.numero);
      setOrderedApartments([...localApartments]);
    } else if (!asc) {
      localApartments.sort((a, b) => b.numero - a.numero);
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
          <img src={asc ? ArrowUp : ArrowDown} alt="order" />
        </div>
        <strong className='table-column-small'>Andar</strong>
        <strong className='table-column-big'>Edifício</strong>
        <strong className='table-column-small'>Valor</strong>
        <strong className='table-column-small'>Status</strong>
      </div>

      <div className='table-body'>
        {orderedApartments.map((apartment) => (
          <div
            className='table-row'
            key={apartment.id}
            onClick={() => {
              open()
              setApartmentClicked(apartment)
            }}>
            <strong className='table-column-small content-number'>
              {apartment.numero}
            </strong>

            <span className='table-column-middle'>
              {apartment.andar}
            </span>

            <span className='table-column-big'>
              {apartment.edificio_nome}
            </span>

            <strong
              className={`table-column-small values `}
            >
              {formatToMoney(apartment.valor)}
            </strong>

            <span className={`table-column-small ${apartment.disponibilidade ? 'positive-value' : 'negative-value'}`}>
              {apartment.disponibilidade ? `Disponível` : `Indisponível`}
            </span>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Table;