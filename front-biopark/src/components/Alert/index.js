import './styles.css'

export default function Alert({ msgAlert }) {
    return (
        <div className='alert-box'>
            <strong>ERROR :</strong>
            <strong>{msgAlert}</strong>
        </div>
    )
}