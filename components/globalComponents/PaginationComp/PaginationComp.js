import React from 'react';
import Pagination from "@mui/material/Pagination";

const PaginationComp = ({ totalCount, pageNum, handleChange }) => {
  return (
    <div className='pagination'>
      <Pagination count={totalCount} page={pageNum} onChange={handleChange} />
    </div>
  );
};

export default PaginationComp
