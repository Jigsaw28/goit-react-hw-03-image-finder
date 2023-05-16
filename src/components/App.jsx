import { Component } from 'react';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { imagesApi } from 'api/imagesApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchText: '',
    hits: [],
    isLoading: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const text = this.state.searchText.trim();
    if (
      (prevState.searchText !== text && text) ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      imagesApi(text, this.state.page)
        .then(({ hits }) => {
          if (hits.length === 0) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          this.setState(prevState => ({
            hits: [...prevState.hits, ...hits],
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false, searchText: '' });
        });
    }
  }

  handleLoad = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  handleSearch = searchText => {
    this.setState({ searchText, page: 1, hits: [] });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery hits={this.state.hits} />
        <Loader visible={this.state.isLoading} />
        {this.state.hits.length > 0 && !this.state.isLoading && (
          <Button onClick={this.handleLoad} />
        )}
      </div>
    );
  }
}
