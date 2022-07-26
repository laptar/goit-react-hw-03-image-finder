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
    this.props.onSubmit(this.state.input);
    this.setState({ input: '' });
  };
  render() {
    return (
      <header className={s.searchbar}>
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
