import './AboutMe.css';
import photo from "../../images/avatar.jpg";
import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__header">
        <h2 className="about-me__heading">Студент</h2>
      </div>
      <div className="about-me__block">
        <img className="about-me__avatar" alt="Фото" src={photo} />
        <h3 className="about-me__name">Евгений</h3>
        <p className="about-me__info">Фронтенд-разработчик, 31 год</p>
        <p className="about-me__description">Родился и в данный момент вернулся в Курск, жил часть времени в Москве,
          закончил юридический факультет, работал по профессии. С 2008 играю музыку на барабанах, cо временем это перешло в хобби,
          с недавнего времени увлекся велоспортом.
          В 2021 выгорел на работе, в том числе от времени в пути до нее, после чего решил работать только удаленно в комфортных для меня условиях и уволился. После обучения планирую заняться фриланс-заказами.</p>
        <Link className='about-me__link-github' to="//github.com/ETiurin" target="_blank">Github</Link>
      </div>
    </section>
  );
}

export default AboutMe;