import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/types/store';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { fetchSavedTracks, setCurrentPage } from 'src/redux/appSlice';

export default function SavedTracksPagination() {
  const { currentPage, total, limit } = useSelector((state: RootState) => state.app.tracksPagination);
  const totalPages = Math.ceil(total / limit);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    batch(() => {
      dispatch(setCurrentPage(value));
      dispatch(fetchSavedTracks());
    });
  };

  return (
    <Stack spacing={2} sx={{ margin: 'auto auto 0 ' }}>
      <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
    </Stack>
  );
}
