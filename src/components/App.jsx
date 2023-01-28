import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import api from '../services/image-api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

import '../index.css';
import css from './App.module.css';

class App extends Component {
  state = {
    imageRequest: '',
    page: 1,
    perPage: 12,
    totalPhoto: 1,
    arrayPhotos: [],
    loading: false,
    showModal: false,
    error: null,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.imageRequest;

    const { imageRequest, page, perPage } = this.state;
    if (prevRequest !== imageRequest || prevState.page !== page) {
      this.setState({
        loading: true,
        arrayPhotos: [],
      });

      const BASE_URL = 'https://pixabay.com/api/';
      const API_KEY = '31696679-bf9e6793322cb75217b9eb83f';

      fetch(
        `${BASE_URL}?q=${imageRequest}&page=${page}&key=${API_KEY}&image_type=phoo&orientation=horizontal&per_page=${perPage}`
      )
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            this.setState({ arrayPhotos: [] });
            this.showMessage();
          }
          const arrayPhotosNew = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return {
                id,
                webformatURL,
                largeImageURL,
                tags,
              };
            }
          );
          this.setState(({ arrayPhotos }) => ({
            arrayPhotos: [...arrayPhotos, ...arrayPhotosNew],
            totalPhoto: totalHits,
          }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = data => {
    this.setState({ imageRequest: data, page: 1, showModal: false });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1, loading: true }));

    // if (this.state.totalPhoto > this.state.perPage) {
    //   return this.setState(prevState => ({ page: prevState.page + 1 }));
    // }
  };

  showMessage = imageRequest => {
    return toast.error(`We did not find photos of ${imageRequest}`, {
      theme: 'colored',
      position: 'top-center',
    });
  };

  openModal = largeImageURL => {
    console.log(this.state.largeImageURL);
    this.setState({ showModal: true, largeImageURL });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      imageRequest,
      arrayPhotos,
      totalPhoto,
      loading,
      error,
      page,
      perPage,
      showModal,
      largeImageURL,
    } = this.state;
    const { handleFormSubmit, loadMore, openModal, closeModal } = this;

    const IsImages = arrayPhotos.length > 0;
    const isAddLoadBtn =
      !loading && totalPhoto - (page - 1) * perPage > perPage;

    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />

        {IsImages && (
          <ImageGallery images={arrayPhotos} openModal={openModal} />
        )}
        {loading && <Loader />}
        {error && <p className={css.message}>Somthing wrong. Try again</p>}

        {!imageRequest && <p className={css.message}>Enter your request</p>}

        {isAddLoadBtn && <Button onClick={loadMore} />}

        {showModal && (
          <Modal onClose={closeModal} largeImageURL={largeImageURL} />
        )}
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
export default App;
