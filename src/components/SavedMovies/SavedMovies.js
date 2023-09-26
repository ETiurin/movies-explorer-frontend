import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './SavedMovies.css';
import { useState, useEffect } from 'react';
import { shortMoviesDuration } from '../../utils/constants';

function SavedMovies({
  savedMovies,
  loggedIn,
  onMovieDelete,
}) {

  const [searchQueryInSaved, setSearchQueryInSaved] = useState("");
  const [searchResultsInSaved, setSearchResultsInSaved] = useState([]);
  const [searchResultsFilteredInSaved, setSearchResultsFilteredInSaved] = useState([]);
  const [isSearchDoneInSaved, setIsSearchDoneInSaved] = useState(false);
  const [isSearchSuccess, setIsSearchSuccess] = useState(true);
  const [isCheckedInSaved, setIsCheckedInSaved] = useState(false);

  const handleSearchQueryChangeInSaved = (event) => {
    const query = event.target.value;
    console.log(query);
    setSearchQueryInSaved(query);
  };

  function handleSearchInSaved() {
    setIsSearchSuccess(false);
    const results = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQueryInSaved.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQueryInSaved.toLowerCase())
    );
    setSearchResultsInSaved(results);
    setIsSearchDoneInSaved(true);
    setIsSearchSuccess(results.length > 0);
  };

  const handleCheckedInSaved = () => {
    setIsCheckedInSaved(!isCheckedInSaved);
  }

  useEffect(() => {
    if (!isSearchDoneInSaved) {
      if (isCheckedInSaved) {
        setSearchResultsFilteredInSaved(savedMovies.filter((movie) => movie.duration <= shortMoviesDuration) || savedMovies.filter((movie) => movie.duration <= 40));
      } else {
        setSearchResultsFilteredInSaved(savedMovies);
      }
    } else {
      if (isCheckedInSaved) {
        setSearchResultsFilteredInSaved(searchResultsInSaved.filter((movie) => movie.duration <= shortMoviesDuration) || savedMovies.filter((movie) => movie.duration <= 40));
      } else {
        setSearchResultsFilteredInSaved(searchResultsInSaved);
      }
    }
  }, [savedMovies, searchResultsInSaved, isCheckedInSaved]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='movies'>
        <SearchForm onChange={handleSearchQueryChangeInSaved} searchQuery={searchQueryInSaved} handleSearch={handleSearchInSaved}
          isChecked={isCheckedInSaved} onCheckboxUpdated={handleCheckedInSaved} />
        {isSearchSuccess ?
          <MoviesCardList movies={searchResultsFilteredInSaved} savedMovie={savedMovies} onMovieDelete={onMovieDelete} />
          : <p className='movies__not-found'>Ничего не найдено</p>
        }

      </main>
      <Footer />
    </>
  )
}
export default SavedMovies;