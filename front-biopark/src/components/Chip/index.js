import './styles.css';

function Chip({
  id,
  title,
  checked,
  buildings,
  setBuildings
}) {

  function handleCheckBuilding() {
    const localBuildings = [...buildings];

    localBuildings.forEach((building) => {
      if (building.id === id) {
        building.checked = !building.checked
      }
    });

    setBuildings([...localBuildings]);
  }

  return (
    <button
      className={`container-chip ${checked ? 'checked' : 'unchecked'}`}
      onClick={handleCheckBuilding}
    >
      {title}
    </button>
  )
}

export default Chip;