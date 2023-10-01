import { Link, NavLink, useLocation } from 'react-router-dom';
import useResize from '../../utils/useResize';

import Logo from '../Logo/Logo';

import './Navigation.css';

function Navigation({ burgerClick, isLoggedIn }) {
  let location = useLocation();

  let size = useResize();

  return (
    <>
      {location.pathname === "/"
        ?
          isLoggedIn
            ?
              size.width <= 768
                ?
                  <>
                    <div className="navigation-wrapper">
                      <Logo />
                      <button className="navigation-burger hover-opacity-btn" onClick={burgerClick} />
                    </div>
                  </>
                :
                  <nav className="navigation">
                    <div className="navigation-wrapper">
                      <Logo />
                      <ul className="navigation__list">
                        <li>
                          <NavLink to="/movies" className={({isActive}) => `navigation__link hover-opacity-link ${isActive ? "navigation__link_active" : ""}`} href="#">
                            Фильмы
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/saved-movies" className={({isActive}) => `navigation__link hover-opacity-link ${isActive ? "navigation__link_active" : ""}`} href="#">
                            Сохраненные фильмы
                          </NavLink>
                        </li>
                      </ul>
                      <Link className="navigation__link navigation__link_type_profile-logged  hover-opacity-btn" to="/profile">
                        Аккаунт
                      </Link>
                    </div>
                  </nav>
            :
              <nav className="navigation">
                <div className="navigation-wrapper">
                  <Logo />
                  <ul className="navigation__list navigation__list_type_main">
                    <li>
                      <Link className="navigation__link navigation__link_type_main hover-opacity-link" to="/signup">
                        Регистрация
                      </Link>
                    </li>
                    <li>
                      <Link className="navigation__link navigation__link_type_main navigation__link_type_signin hover-opacity-btn" to="/signin">
                        Войти
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
        :
          size.width <= 768
            ?
              <>
                <div className="navigation-wrapper">
                  <Logo />
                  <button className="navigation-burger hover-opacity-btn" onClick={burgerClick} />
                </div>
              </>
            :
              <nav className="navigation">
                <div className="navigation-wrapper">
                  <Logo />
                  <ul className="navigation__list">
                    <li>
                      <NavLink to="/movies" className={({isActive}) => `navigation__link navigation__link_color_black hover-opacity-link ${isActive ? "navigation__link_active" : ""}`} href="#">
                        Фильмы
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/saved-movies" className={({isActive}) => `navigation__link navigation__link_color_black hover-opacity-link ${isActive ? "navigation__link_active" : ""}`} href="#">
                        Сохраненные фильмы
                      </NavLink>
                    </li>
                  </ul>
                  <Link className="navigation__link navigation__link_color_black navigation__link_type_profile hover-opacity-btn" to="/profile">
                    Аккаунт
                  </Link>
                </div>
              </nav>
      }
    </>
  )
}

export default Navigation;