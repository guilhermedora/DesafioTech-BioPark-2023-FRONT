import './styles.css';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ConfirmRequest from '../ConfirmResquest';
import { useState } from 'react';

function Resume({ contracts }) {
  const [choice, setChoice] = useState([])
  const [open, setOpen] = useState(false)
  console.log(contracts);
  function handleChoice(choice) {
    setChoice(choice)
    setOpen(true)
  }
  return (
    <>
      {contracts.length > 0 &&
        <Card className='container-resume' variant='outlined'>
          <h1>Solicitacoes</h1>
          {contracts.map((con) => (
            <div className='container-require'>
              <Button className='btn-require' onClick={() => { handleChoice(con) }}>
                <div className='horizontal-line'></div>
                <h4 className='resume'>{`
                ${con.renter_name} deseja selar um contrato referente ao apartamento
                número ${con.id} do edifício "${con.building_name}" por
                ${con.month_number} ${con.month_number > 1 ? 'meses' : 'mes'}.`}
                </h4>
                <h4 className='resume'>
                  {`Contato:`}
                  <h4>{`${con.renter_email}`}</h4>
                </h4>
                <h4 className='resume'>
                  {`Data da requisicao:`}
                  <h4>{`${con.date_start}`}</h4>
                </h4>
              </Button>
              <ConfirmRequest
                open={open && choice.id === con.id}
                info={[...contracts]}
                handleClose={() => setOpen(false)}
              ></ConfirmRequest>
            </div>
          ))}
        </Card>
      }
    </>
  );
}

export default Resume;