import { NavLink, Link } from 'react-router-dom';

import './BurgerMenu.css';

function BurgerMenu({ isOpen, onClose }) {
  return (
    <div className={`burger-menu ${isOpen ? "burger-menu_opened" : ""}`}>
      <div className={`burger-menu__body ${isOpen ? "burger-menu__body_opened" : ""}`}>
        <nav className="navigation">
          <div className="navigation-wrapper navigation-wrapper_type_burger">
            <ul className="navigation__list navigation__list_type_burger">
              <li>
                <Link className="navigation__link navigation__link_color_black navigation__link_type_burger hover-opacity-link" to="/">
                  Главная
                </Link>
              </li>
              <li>
                <NavLink to="/movies" className={({isActive}) => `navigation__link navigation__link_color_black navigation__link_type_burger hover-opacity-link ${isActive ? "navigation__link_burger_active" : ""}`} href="#">
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink to="/saved-movies" className={({isActive}) => `navigation__link navigation__link_color_black navigation__link_type_burger hover-opacity-link ${isActive ? "navigation__link_burger_active" : ""}`} href="#">
                  Сохраненные фильмы
                </NavLink>
              </li>
            </ul>
            <Link className="navigation__link navigation__link_type_profile hover-opacity-btn" to="/profile">
              Аккаунт
            </Link>
          </div>
        </nav>
        <button className="burger-menu__close hover-opacity-btn" onClick={onClose} />
      </div>
    </div>
  )
}

export default BurgerMenu;