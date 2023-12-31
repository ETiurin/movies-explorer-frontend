import './SearchForm.css';
import Checkbox from '../CheckBox/CheckBox';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__container'>
          <div className='search__icon'></div>
          <input
            type="text"
            className="search__field"
            name="movie"
            placeholder="Фильм"
            value=""
            autoFocus
            required
          ></input>
          <button
            className='search__button'
            type="submit"
          ></button>
        </div>
      </form>
      <Checkbox />
    </section>
  );
}

export default SearchForm;