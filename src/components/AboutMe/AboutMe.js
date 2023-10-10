import './AboutMe.css';
import photo from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="container">
      <h2 className="about-me__heading">Студент</h2>
        <div className="about-me__info-wrapper">
          <div className="about-me__info">
            <h3 className="about-me__name">Евгений</h3>
            <p className="about-me__description">Фронтенд-разработчик, 31 год</p>
            <p className="about-me__bio">
            Родился и в данный момент вернулся в Курск, жил часть времени в Москве,
            закончил юридический факультет, работал по профессии. С 2008 играю музыку
            на барабанах, cо временем это перешло в хобби, с недавнего времени увлекся велоспортом.
            В 2021 выгорел на работе, в том числе от времени в пути до нее, после чего решил работать
            только удаленно в комфортных для меня условиях и уволился. После обучения планирую заняться фриланс-заказами.
            </p>
            <a className="about-me__github hover-opacity-link" href="https://github.com/ETiurin" target="_blank">Github</a>
          </div>
          <img className="about-me__photo" src={photo} alt="Фото студента" />
        </div>
        <div className="about-me__portfolio">
          <h4 className="about-me__portfolio-title">Портфолио</h4>
          <ul className="about-me__portfolio-links">
            <li className="about-me__portfolio-item">
              <a className="about-me__portfolio-link hover-opacity-link" href="https://etiurin.github.io/how-to-learn" target="_blank">
                Статичный сайт
              </a>
            </li>
            <li className="about-me__portfolio-item">
              <a className="about-me__portfolio-link hover-opacity-link" href="https://etiurin.github.io/russian-travel/index.html" target="_blank">
                Адаптивный сайт
              </a>
            </li>
            <li className="about-me__portfolio-item">
              <a className="about-me__portfolio-link hover-opacity-link" href="https://etiurin.github.io/mesto" target="_blank">
                Одностраничное приложение
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AboutMe;