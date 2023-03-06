import './styles.css';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ConfirmRequest from '../ConfirmResquest';
import { useState } from 'react';

function Resume({ contracts }) {
  const [choice, setChoice] = useState([])
  const [open, setOpen] = useState(false)
  function handleChoice(choice) {
    setChoice(choice)
    setOpen(true)
  }
  return (
    <>
      {contracts.length > 0 &&
        <Card className='container-resume' variant='outlined'>
          <h1>Solicitações</h1>
          <div className='container-require'>
            {contracts.map((con) => (
              <>
                <Button className='btn-require' onClick={() => { handleChoice(con) }}>
                  <div className='horizontal-line'></div>
                  <h4 className='resume'>{`
                ${con.renter_name} deseja selar um contrato referente ao 
                apartamento número ${con.apartment_number} do edifício 
                "${con.building_name}" por ${con.month_number} 
                ${con.month_number > 1 ? 'meses' : 'mes'}.`}
                  </h4>
                  <h4 className='resume'>
                    {`Contato:`}
                    <br></br>
                    {`${con.renter_email}`}
                  </h4>
                  <h4 className='resume'>
                    {`Data da requisicao:`}
                    <br></br>
                    {`${con.date_start}`}
                  </h4>
                </Button>
                <ConfirmRequest
                  open={open && choice.id === con.id}
                  info={[...contracts]}
                  handleClose={() => setOpen(false)}
                ></ConfirmRequest>
              </>
            ))}
          </div>
        </Card>
      }
    </>
  );
}

export default Resume;