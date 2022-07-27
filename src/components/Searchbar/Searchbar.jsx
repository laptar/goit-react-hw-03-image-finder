import { Component } from 'react';
import s from './Serchbar.module.css';

export class Serchbar extends Component {
  state = {
    input: '',
  };

  handleApdateInpuy = e => {
    this.setState({ input: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.input.trim() !== '') {
      this.props.onSubmit(this.state.input);
      this.handleReset();
    }
  };
  handleReset = () => {
    this.setState({ input: '' });
  };
  handlePerPage = e => {
    this.props.onChangePerPage(e.target.value);
  };

  render() {
    return (
      <header className={s.searchbar}>
        <label className={s.show}>
          Show pictures:
          <select name="perPage" onChange={this.handlePerPage}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </label>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.input}
            onChange={this.handleApdateInpuy}
          />
        </form>
      </header>
    );
  }
}
