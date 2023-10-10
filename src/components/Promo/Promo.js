import './Promo.css'

function Promo() {
  return (
    <section className="promo">
      <div className="container promo-wrapper">
        <div className="promo__info">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a className="promo__btn hover-opacity-btn" href="#about-project">Узнать больше</a>
        </div>
        <div className="promo__logo" />
      </div>
    </section>
  )
}

export default Promo;