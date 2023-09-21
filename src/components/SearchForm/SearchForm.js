import './SearchForm.css';
import Checkbox from '../CheckBox/CheckBox';

function SearchForm({ onChange, searchQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch()
  }
  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmit}>
        <div className='search__container'>
          <div className='search__icon'></div>
          <input
            type="text"
            className="search__field"
            name="movie"
            placeholder="Фильм"
            value={searchQuery}
            onChange={onChange}
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