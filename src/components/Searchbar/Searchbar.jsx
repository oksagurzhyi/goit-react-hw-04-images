import { useState } from 'react';
import css from '../styles.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export default function SearchBar({ onSubmitForm }) {
  const [query, setQuery] = useState(null);

  const handleChangeInput = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!query.trim()) {
      return alert('Please, fill this field ');
    }
    onSubmitForm(query);
    e.currentTarget.search.value = '';
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <ImSearch fill="blue" />
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
