import { Component } from 'react';
import { Serchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleyItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImage } from './FetchApi';
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
  handlePerPage = perPage => {
    this.setState({ perPage });
  };
  handleSubmit = input => {
    this.handleFeth(input, 1, [], this.state.perPage);
  };
  handleFeth = (serch, page, imageList, perPage) => {
    this.setState({ showLoad: true });
    fetchImage(serch, page, perPage)
      .then(res => {
        if (res.hits.length) {
          return this.setState({
            imageList: [...imageList, ...res.hits],
            totalImg: res.totalHits,
            searchImg: serch,
            page: page + 1,
            status: 'resolved',
          });
        } else {
          return this.setState({
            imageList: [...imageList, ...res.hits],
            totalImg: res.totalHits,
            searchImg: serch,
            page: page + 1,
            status: 'rejected',
          });
        }
      })
      .finally(() => this.setState({ showLoad: false }));
  };
  handleMoreImg = () => {
    const { searchImg, page, imageList, perPage } = this.state;
    this.handleFeth(searchImg, page, imageList, perPage);
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
