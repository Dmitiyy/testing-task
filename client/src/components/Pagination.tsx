import { FC, useEffect, useState } from "react";
import { SvgArrow } from "./SvgArrow";

interface Props {
  getPage: (page: number) => void
}

export const Pagination: FC<Props> = ({ getPage }) => {
  const [page, setPage] = useState<number>(1);

  // eslint-disable-next-line
  useEffect(() => {getPage(page)}, [page]);

  return (
    <div className="pagination">
      <h1>Apartments for sale</h1>
      <div className="pagination__controls">
        <button 
          disabled={page === 1}
          className={page === 1 ? 'prev disabled' : 'prev'}
          onClick={() => {setPage(prev => prev - 1)}}
        >
          <SvgArrow />
        </button>
        <h3>{page}</h3>
        <button 
          disabled={page === 25}
          className={page === 25 ? 'next disabled' : 'next'}
          onClick={() => {setPage(prev => prev + 1)}}
        >
          <SvgArrow />
        </button>
      </div>
    </div>
  )
}