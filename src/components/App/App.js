import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Message from '../Message/Message';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

import authApi from '../../utils/AuthApi';
import MainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];
  const mainApi = new MainApi({
    url: 'https://api.ETiurin.nomoredomainsicu.ru',
    headers: {
      'Content-Type': 'application/json',
      authorization: `${localStorage.getItem('jwt')}`,
    },
  });

  const [ isBurgerOpen, setIsBurgerOpen ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ isEditClicked, setIsEditClicked ] = useState(false);
  const [ readOnly, setReadOnly ] = useState(true);
  const [ movies, setMovies ] = useState([]);
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [messageState, setMessageState] = useState({
    isOpen: false,
    message: '',
    isSuccess: true,
  });

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      authApi.checkToken(jwt)
        .then(res => {
          if (res) {
            setIsLoggedIn(true);

            navigate(location.pathname, { replace: true })
          }
        })
        .catch(err => console.log(err));
    }
  }, []);

  useEffect(() => {
    isLoggedIn &&
      Promise.all([mainApi.getProfileInfo(), mainApi.getSavedMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user.data);

          setSavedMovies(movies);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
      })
        .catch(err => console.log(err));
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn && localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, isLoggedIn]);

  useEffect(() => {
    if (isBurgerOpen) {
      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('mousedown', handleOverlayClose);
      document.addEventListener('click', handleLinkClose)
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleOverlayClose);
      document.removeEventListener('click', handleLinkClose)
    };
  }, [isBurgerOpen]);

  useEffect(() => {
    setTimeout(() => {
      if (messageState.isOpen) {
        setMessageState({
          ...messageState,
          isOpen: false,
        });
      }
    }, 3000);
  }, [messageState.isOpen]);

  const handleShowMessage = (text, isSuccess = true) => {
    setMessageState({
      isOpen: true,
      text,
      isSuccess
    })
  }

  const handleError = (err) => {
    let errorText = '';
    if(err.includes('400')) {
      errorText = 'Введены некорректные данные.';
    }
    if(err.includes('401')) {
      errorText = 'Неверный логин или пароль.';
    }
    if(err.includes('409')) {
      errorText = 'Такой пользователь уже существует.';
    }

    handleShowMessage(errorText, false);
  }

  const handleEmptyReqMessage = () => {
    handleShowMessage('Нужно ввести ключевое слово.', false);
  }

  const handleRegister = (name, email, password) => {
    authApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password);

        handleShowMessage('Вы успешно зарегистривались!')
      })
      .catch(err => {
        handleError(err);
        console.log(err)
      });
  };

  const handleLogin = (email, password) => {
    authApi.authorization(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          navigate('/movies', {replace: true});

          handleShowMessage('Вы успешно вошли!');
        }
      })
      .catch(err => {
        handleError(err);
        console.log(err);
      });
  };

  const handleUpdateUser = (name, email) => {
    mainApi.patchProfileInfo(name, email)
      .then(() => {
        setCurrentUser({...currentUser, name, email});

        handleShowMessage('Профиль успешно обновлен!')
      })
      .then(() => {
        setIsEditClicked(false);
        setReadOnly(true);
      })
      .catch(err => {
        handleError(err);
        console.log(err);
      });
  }

  const handleDisableEditUser = () => {
    setReadOnly(true);
    setIsEditClicked(false);
  }

  const handleEditUser = () => {
    setReadOnly(false);
    setIsEditClicked(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/', { replace: true });

    handleShowMessage('Вы вышли из аккаунта');
  }

  const handleGetMovies = (setIsLoading) => {
    if (localStorage.getItem('movies')) {
      return Promise.resolve(JSON.parse(localStorage.getItem('movies')));
    } else {
      setIsLoading(true);
      return moviesApi.getData()
        .then(data => {
          localStorage.setItem('movies', JSON.stringify(data));

          setIsLoading(false);
          return data;
        })
        .catch(err => console.log(err));
    }
  }

  const handleSaveMovie = (movie, movieId, isSaved) => {
    if (isSaved) {
      handleDeleteMovie(movieId);
    } else {
      mainApi.saveMovie(movie)
        .then(data => {
          setSavedMovies([...savedMovies, data]);
        })
        .catch(err => console.log(err));
    }
  };

  const handleDeleteMovie = (movieId) => {
    const foundSavedMovies = JSON.parse(localStorage.getItem('foundSavedMovies'));

    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies(savedMovies.filter(m => m._id !== movieId));

        if (foundSavedMovies) {
          const newFoundSavedMovies = foundSavedMovies.filter(m => m._id !== movieId);

          localStorage.setItem('foundSavedMovies', JSON.stringify(newFoundSavedMovies));
        }
      })
      .catch(err => console.log(err));
  };

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleCloseBurger = () => {
    setIsBurgerOpen(false)
  };

  const handleCloseMessage = () => {
    setMessageState({
      ...messageState,
      open: false,
    })
  };

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      handleCloseBurger();
    }
  };

  const handleOverlayClose = (e) => {
    if (e.target.classList.contains('burger-menu_opened')) {
      handleCloseBurger();
    }
  };

  const handleLinkClose = (e) => {
    if (e.target.tagName === 'A') {
      handleCloseBurger();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {headerPaths.includes(location.pathname)
        ?
          <Header
            burgerClick={handleBurgerClick}
            isLoggedIn={isLoggedIn} />
        : "" }
      <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Main />} />
          <Route path="signup" element={<Register onRegister={handleRegister} />} />
          <Route path="signin" element={<Login onLogin={handleLogin} />} />

          <Route path="movies" element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={Movies}
              movies={movies}
              savedMovies={savedMovies}
              onSaveMovie={handleSaveMovie}
              onEmptyReqMessage={handleEmptyReqMessage}
              onGetMovies={handleGetMovies}
            />
            }
          />

          <Route path="saved-movies" element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={SavedMovies}
              savedMovies={savedMovies}
              onDeleteMovie={handleDeleteMovie}
              onEmptyReqMessage={handleEmptyReqMessage} />} />

          <Route path="profile" element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={Profile}
              onLogout={handleLogout}
              onUpdateUser={handleUpdateUser}
              readOnly={readOnly}
              isEditClicked={isEditClicked}
              onEditUser={handleEditUser}
              onDisableEditUser={handleDisableEditUser} />} />
      </Routes>
      {footerPaths.includes(location.pathname) ? <Footer /> : "" }

      <BurgerMenu isOpen={isBurgerOpen} onClose={handleCloseBurger} />

      <Message
        isOpen={messageState.isOpen}
        isSuccess={messageState.isSuccess}
        text={messageState.text}
        onClose={handleCloseMessage} />

    </CurrentUserContext.Provider>
  )
}

export default App;
