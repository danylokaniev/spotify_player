import React, { FunctionComponent } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/types/store';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getSavedTracks, setCurrentPage } from 'src/redux/appSlice';

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
