import { Component } from 'react';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { imagesApi } from 'api/imagesApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchText: '',
    hits: [],
    isLoading: false,
    page: 1,
    showModal: false,
    modalImageUrl: '',
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

  toggleModal = (modalImageUrl) => {
    this.setState(({ showModal }) => ({
      modalImageUrl,
      showModal: !showModal,
    }));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleLoad = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  handleSearch = searchText => {
    this.setState({ searchText, page: 1, hits: [] });
  };

  render() {
    const {hits, isLoading, showModal, modalImageUrl} = this.state
    return (
      <div className="App">
        {showModal && (
          <Modal
            openModal={modalImageUrl}
            closeModal={this.closeModal}
          />
        )}
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery hits={hits} showModal={this.toggleModal} />
        <Loader visible={isLoading} />
        {hits.length > 0 && !isLoading && (
          <Button onClick={this.handleLoad} />
        )}
      </div>
    );
  }
}
