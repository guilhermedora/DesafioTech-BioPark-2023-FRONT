import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import api from '../../services/api';
import { loadBuildings } from '../../utils/requisitions';
import { getItem } from '../../utils/storage';
import './styles.css';
import { formatToDate, formatPhone } from '../../utils/formatters'
import ButtonOpacity from '../ButtonOpacity';
import Zoom from '@mui/material/Zoom';

function CopyContract({ open, handleClose, apartmentClicked }) {
  return (
    <>
      {open &&
        <div className='backdrop'>
          <Zoom
            in={open} style={{ transitionDelay: open ? '50ms' : '0ms' }}
          >
            <div className='modal-detail'>
              <img
                className='close-button'
                src={CloseIcon}
                alt="close-button"
                onClick={handleClose}
              />
              <h2>{`Contato Locatário`}</h2>
              <form>
                <div className='container-inputs-detail'>
                  <label>Nome</label>
                  <input
                    disabled={true}
                    placeholder={apartmentClicked.renter_name}
                  />
                </div>
                <div className='container-inputs-detail'>
                  <label>E-mail</label>
                  <input
                    placeholder={apartmentClicked.renter_email}
                  />
                </div>
              </form>
            </div>
          </Zoom>
        </div>
      }
    </>
  )
}

export default CopyContract;