import './Movies.css';
import { useState, useEffect, useCallback } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoreButton from '../MoreButton/MoreButton';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { shortMoviesDuration } from '../../utils/constants';


function Movies({
    movies,
    loggedIn,
    savedMovie,
    onMovieSave,
    onMovieDelete,
}) {
    const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem("searchQuery") || "");
    const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem("searchResults")) || []);
    const [searchResultsFiltered, setSearchResultsFiltered] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isSearchSuccess, setIsSearchSuccess] = useState(true);

    const [isChecked, setIsChecked] = useState(() => JSON.parse(localStorage.getItem("checkboxState")) || false);

    const [isNumberOfMoviesShown, setIsNumberOfMoviesShown] = useState(12);
    const [isNumberToAddMovies, setIsNumberToAddMovies] = useState(3);
    const [isMoreBtnShown, setIsMoreBtnShown] = useState(true);

    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        localStorage.setItem("searchQuery", query);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleSearch() {
        setIsLoading(true);
        setIsSearchSuccess(false);
        setTimeout(() => {
            const results = movies.filter((movie) => {
              return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
            });
            setSearchResults(results);
            localStorage.setItem("searchResults", JSON.stringify(results));
            setIsSearchSuccess(results.length > 0);
            setIsLoading(false);
        }, 2000);
    };

    const handleChecked = () => {
        setIsChecked(!isChecked);
        localStorage.setItem("checkboxState", JSON.stringify(!isChecked));
    }

    useEffect(() => {
        if (isChecked) {
            setSearchResultsFiltered(searchResults.filter((movie) => movie.duration <= shortMoviesDuration));
        } else {
            setSearchResultsFiltered(searchResults);
        }
    }, [searchResults, isChecked]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 805) {
                setIsNumberOfMoviesShown(12);
                setIsNumberToAddMovies(3);
            } else if (window.innerWidth > 450 && window.innerWidth <= 805) {
                setIsNumberOfMoviesShown(8);
                setIsNumberToAddMovies(2);
            } else if (window.innerWidth <= 450) {
                setIsNumberOfMoviesShown(5);
                setIsNumberToAddMovies(2);
            }
        };

        handleResize();

        setTimeout(() => {
            window.addEventListener('resize', handleResize);
        }, 2000);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleChangeMoreBtn = () => {
        if (searchResults.length > isNumberOfMoviesShown) {
            setIsMoreBtnShown(true);
        } else {
            setIsMoreBtnShown(false);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadMore = useCallback(() => {
        setIsNumberOfMoviesShown(isNumberOfMoviesShown + isNumberToAddMovies);
    });

    const displayedMovies = searchResultsFiltered.slice(0, isNumberOfMoviesShown);

    useEffect(() => {
        handleChangeMoreBtn();
    }, [loadMore, handleSearch, handleChangeMoreBtn]);

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className='movies'>
                <SearchForm onChange={handleSearchQueryChange} searchQuery={searchQuery} onSearch={handleSearch}
                    isChecked={isChecked} onCheckboxUpdated={handleChecked} />
                {isLoading ? <Preloader />
                    : isSearchSuccess ? (<div className='movies__main-content'>
                        <MoviesCardList movies={displayedMovies} savedMovie={savedMovie} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} />
                        <MoreButton isShown={isMoreBtnShown} loadMore={loadMore} />
                    </div>
                    ) : <p className='movies__not-found'>Ничего не найдено</p>
                }
            </main>
            <Footer />
        </>
    )
}
export default Movies;