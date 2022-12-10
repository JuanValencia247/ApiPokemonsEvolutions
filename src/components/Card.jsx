import '../sass/Card.scss'

export const Card = ({name, img}) => {
  const mayus = name[0].toUpperCase() + name.slice(1);

  return (
    <div className='card'>
        <div className='card__cont'>
            <p className='card__name'>{mayus}</p>
        </div>
        <div className='card__box'>
            <img className='card__img' src={img} alt="pokemon img" />
        </div>
        <p className='card__encounter'>Pokemon Evolution {mayus}</p>
    </div>
  )
}
