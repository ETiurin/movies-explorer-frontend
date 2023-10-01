import './Footer.css';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__info">
          <p className="footer__year">&copy;2023</p>
          <nav>
            <ul className="footer__items">
              <li className="footer__item"><Link to="//practicum.yandex.ru" className="footer__link" target="_blank">Яндекс.Практикум</Link></li>
              <li className="footer__item"><Link to="//github.com/ETiurin" className="footer__link" target="_blank">Github</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer >
  );
}

export default Footer;