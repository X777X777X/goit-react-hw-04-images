import axios from 'axios';

export async function fetchImages(inputData, page) {
  const apiKey = '36888849-fb2b1d27779df2856d2045320';
  const perPage = 12;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${inputData}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;
  }
}
