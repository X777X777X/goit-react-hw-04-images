import React, { Component } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import './App.css';
import { fetchImages } from './fetchImages/fetchImages';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';


let page = 1;

class App extends Component {
  state = {
    inputData: '',
    items: [],
    page: 1,
    status: 'idle',
    totalHits: 0,
  };


  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.inputData !== prevState.inputData
    ) {
      fetchImages();
    }
  }

  handleSubmit = async inputData => {
    if (inputData.trim() === '') {
      Notiflix.Notify.failure('You cannot search by empty field, try again.');
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          Notiflix.Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState({
            items: hits,
            inputData,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };


  onNextPage = async () => {
    const { inputData, page } = this.state;
    this.setState({ status: 'pending' });

    try {
      const { totalHits, hits } = await fetchImages(inputData, page + 1);
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
        page: page + 1,
        loadMore: page + 1 < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };


  render() {
    const { totalHits, status, items } = this.state;
    if (status === 'idle') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <p>Something wrong, try later</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.onNextPage} />
          )}
        </div>
      );
    }
  }
}
export default App;