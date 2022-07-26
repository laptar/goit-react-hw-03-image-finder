import { Component } from 'react';
import { Serchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleyItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImage } from './FetchApi';

export class App extends Component {
  state = {
    searchImg: '',
    imageList: [],
    page: 1,
  };

  handleSubmit = input => {
    this.setState({ searchImg: input });
    fetchImage(this.state.page, this.state.input).then(res =>
      this.setState({ imageList: res.hits })
    );
  };
  render() {
    const { imageList } = this.state;
    return (
      <div className="app">
        <Serchbar onSubmit={this.handleSubmit} />
        <ImageGallery>
          {imageList.map(img => {
            return <ImageGalleyItem key={img.id} imageList={img} />;
          })}
        </ImageGallery>
      </div>
    );
  }
}
