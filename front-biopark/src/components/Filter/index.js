import { useEffect, useState } from 'react';
import FilterIcon from '../../assets/filter-icon.svg';
import { loadBuildings, loadApartments } from '../../utils/requisitions';
import Chip from '../Chip';
import './styles.css';
import Grow from '@mui/material/Grow';

function Filter({ apartmentList, setApartments }) {
    const [open, setOpen] = useState(false);
    const [buildings, setBuildings] = useState([]);
    const [filtering, setFiltering] = useState(false)

    useEffect(() => {
        let search = false
        buildings.forEach((building) => {
            if (building.checked) {
                return search = true;
            }
        });
        setFiltering(search)
    }, [buildings])

    async function handleClearFilters() {
        const localBuildings = [...buildings];

        localBuildings.forEach(building => building.checked = false);

        setBuildings([...localBuildings]);

        const allApartments = await loadApartments();

        setApartments([...allApartments]);
        setFiltering(false)
    }

    async function handleApplyFilters() {
        const localApartments = await loadApartments();
        setApartments([...localApartments]);

        const buildingsCheckedId = [];

        buildings.forEach((building) => {
            if (building.checked) {
                buildingsCheckedId.push(building.edificio_nome);
            }
        });

        if (!buildingsCheckedId.length) {
            setFiltering(false)
            return;
        }

        const onlyFilteredApartments = localApartments.filter(
            (apartment) => buildingsCheckedId.includes(apartment.edificio_nome)
        );
        setApartments([...onlyFilteredApartments]);
    }

    useEffect(() => {
        async function getAllBuildings() {
            const allBuildings = await loadBuildings();
            allBuildings.forEach(build => {
                build.checked = false;
            });

            setBuildings([...allBuildings]);
        }
        if (open) {
            getAllBuildings();
        }
        if (!open) {
            handleClearFilters();
            setFiltering(false)
        }
    }, [open]);

    return (
        <div className='container-filter'>

            <button onClick={() => setOpen(!open)} className="btn-white btn-filter">
                <img src={FilterIcon} alt="filter" />
                Filtrar
            </button>

            {open &&
                <Grow
                    in={open}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(open ? { timeout: 500 } : {})}
                >
                    <div className='filter-body'>
                        <strong>Edifícios</strong>

                        <div className='container-categories' onClick={() => setFiltering(true)}>
                            {buildings.map((build) => (
                                <Chip
                                    key={build.id}
                                    checked={build.checked}
                                    title={build.edificio_nome}
                                    id={build.id}
                                    buildings={buildings}
                                    setBuildings={setBuildings}
                                />
                            ))}
                        </div>

                        <div className='container-btns-filter'>
                            <button
                                className='btn-white btn-extra-small'
                                onClick={handleClearFilters}
                            >
                                Limpar Filtros
                            </button>
                            <button
                                className={
                                    filtering
                                        ? 'btn-red btn-extra-small'
                                        : 'btn-white btn-extra-small'
                                }
                                onClick={handleApplyFilters}
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                </Grow>
            }

        </div>
    )
}

export default Filter;