import './styles.css';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
function Resume({ contracts }) {
  return (
    <>
      {contracts.length > 0 &&
        <CardActionArea className='container-resume' variant='outlined'>
          <h1>Meus Contratos</h1>
          <div className='line-resume'>
            {contracts.map((con) => (
              <div>
                <div className='horizontal-line'></div>
                <h4 className='resume'>{`Contrato Nª: ${con.id}`}</h4>
                <h4 className='resume'>{`Edifício: ${con.building_name}`}</h4>
                <h4 className='resume'>{`Apartamento: ${con.apartment_number}`}</h4>
                <h4 className='resume'>{`Inicio do contrato: ${con.date_start}`}</h4>
                <h4 className='resume'>
                  {`Duracao do contrato: ${con.month_number}
                 ${con.month_number > 1 ? 'meses' : 'mes'}`}
                </h4>
              </div>
            ))}
          </div>
        </CardActionArea>
      }
    </>
  );
}

export default Resume;