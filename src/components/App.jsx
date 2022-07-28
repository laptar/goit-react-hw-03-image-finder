import { Component } from 'react';
import { Serchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleyItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImage } from '../FetchApi';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchImg: '',
    imageList: [],
    totalImg: 0,
    page: 1,
    perPage: 5,
    showModal: false,
    showLoad: false,
    modalImg: '',
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchImg, page, imageList, perPage } = this.state;
    console.log(imageList);

    if (prevState.page !== page || prevState.searchImg !== searchImg) {
      this.setState({ showLoad: true });
      fetchImage(searchImg, page, perPage)
        .then(res => {
          return this.setState({
            imageList: [...imageList, ...res.hits],
            totalImg: res.totalHits,
            status: res.hits.length ? 'resolved' : 'rejected',
          });
        })
        .finally(() => this.setState({ showLoad: false }));
    }
  }
  handlePerPage = perPage => {
    this.setState({ perPage });
  };

  handleSubmit = input => {
    if (input !== this.state.searchImg) {
      this.setState({ searchImg: input, page: 1, imageList: [] });
    }
  };

  handleMoreImg = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log();
  };

  handleToglModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleClick = e => {
    if (e.target.dataset.source) {
      this.setState({ modalImg: e.target.dataset.source });
      this.handleToglModal();
    }
    if (e.target.dataset.overlay) {
      this.handleToglModal();
    }
  };

  render() {
    const {
      searchImg,
      imageList,
      totalImg,
      showModal,
      modalImg,
      showLoad,
      status,
    } = this.state;

    return (
      <div className="app" onClick={this.handleClick}>
        <Serchbar
          onSubmit={this.handleSubmit}
          onChangePerPage={this.handlePerPage}
          status={status}
        />
        {status === 'idle' && <h2 className="message">Enter the query</h2>}
        {status === 'rejected' && (
          <h2 className="message">Nothing found for your query: {searchImg}</h2>
        )}

        {status === 'resolved' && (
          <ImageGallery>
            {imageList.map(img => {
              return <ImageGalleyItem key={img.id} imageList={img} />;
            })}
          </ImageGallery>
        )}
        {!showLoad && imageList.length < totalImg && (
          <Button onClick={this.handleMoreImg} />
        )}
        {showLoad && <Loader />}
        {showModal && (
          <Modal imgUrl={modalImg} onClose={this.handleToglModal} />
        )}
      </div>
    );
  }
}
