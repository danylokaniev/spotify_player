import React, { FunctionComponent } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/store';
import { Pagination, Stack } from '@mui/material';
import { getSavedTracks, setCurrentPage } from '../redux/appSlice';

const SavedTracksPagination: FunctionComponent<Record<string, never>> = () => {
  const { currentPage, total, limit } = useSelector((state: RootState) => state.app.tracksPagination);
  const totalPages = Math.ceil(total / limit);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    batch(() => {
      dispatch(setCurrentPage(value));
      dispatch(getSavedTracks());
    });
  };

  return (
    <Stack spacing={2} sx={{ margin: 'auto auto 0 ' }}>
      <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
    </Stack>
  );
};

export default SavedTracksPagination;
