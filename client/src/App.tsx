import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { SvgArrow } from './components/SvgArrow';
import LoadingIcon from './images/loading.svg';
import { Pagination } from './components/Pagination';
import './App.css';

type Card = {
  image: string;
  href: string;
  title: string;
}

function App() {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data, refetch } = useQuery(['cards', page], async () => {
    const response = await axios.get(`http://localhost:5000/getCards?page=${page}`);
    return response.data;
  })
  const [cards, setCards] = useState<Card[]>([]);
  
  useEffect(() => {
    if (!isError && !isLoading && data) setCards(data);
  }, [isLoading, isError, data])

  return (
    <div className="App">
      <div className='container'>
        <Pagination getPage={(page) => {
          setPage(page);
          refetch();
        }} />
        {
          isLoading && (
            <div className='loading-wrap'>
              <img src={LoadingIcon} alt="loading" className='loading' />
            </div>
          )
        }
        {
          isError && (
            <div className='loading-wrap'>
              <h3 className='error'>Something went wrong, try again later</h3>
            </div>
          )
        }
        <div className='cards'>
          {
            cards && !isLoading && !isError && (
              cards.map((item: Card, index: number) => {
                return (
                  <div className='cards__item' key={item.title + index}>
                    <img src={item.image} alt="card" />
                    <div className='cards__btns'>
                      <h3>{item.title}</h3>
                      <a href={item.href} target='_blank' rel="noreferrer">
                        <button> 
                          <SvgArrow />
                        </button>
                      </a>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
