import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import css from './SearchBar.module.css';

class Searchbar extends Component {
  state = {
    imageRequest: '',
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ imageRequest: value.toLowerCase() });
  };

  handleSubmit = e => {
    const { imageRequest } = this.state;
    e.preventDefault();
    if (imageRequest.trim() === '') {
      return toast.warn('Enter the regust', {
        theme: 'colored',
        position: 'top-center',
      });
    }
    this.props.onSubmit(imageRequest);

    this.setState({ imageRequest: '' });
    e.target.reset();
  };

  // resetForm = () => {
  //   this.setState({ photoRequest: '', page: 1 });
  // };

  render() {
    const { imageRequest } = this.state;
    return (
      <header className={css.bar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <ImSearch color="#212121" size={16} />
          </button>

          <input
            onChange={this.handleChange}
            className={css.input}
            name="imageRequest"
            value={imageRequest}
            type="text"
            autoComplete="on"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
