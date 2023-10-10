import { useNavigate } from 'react-router-dom';

import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button
        className="not-found__back-link hover-opacity-link"
        type="button"
        name="back-btn"
        aria-label="Вернуться назад"
        onClick={handleBack}>
          Назад
      </button>
    </div>
  )
}

export default NotFound;