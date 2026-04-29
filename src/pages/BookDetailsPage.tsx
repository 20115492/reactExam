import { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getWorkDetails, coverUrl } from '../api/openLibraryApi';
import { BookDetails } from '../types/bookTypes';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<BookDetails | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    getWorkDetails(id)
      .then((d) => {
        if (!mounted) return;
        setDetails(d as BookDetails);
      })
      .catch((e) => {
        if (!mounted) return;
        // setError(String(e));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  const renderDescription = (d?: string | { value: string }) => {
    if (!d) return null;
    return typeof d === 'string' ? d : d.value;
  };

 
  if (loading) return <CircularProgress />;
 
  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4" component="h1">
          {details?.title ?? 'Book Details'}
        </Typography>

        {details?.covers && details.covers.length > 0 ? (
          <Box>
            <Avatar
              src={coverUrl(details.covers[0], 'L')}
              sx={{ width: 160, height: 240 }}
              variant="square"
            />
          </Box>
        ) : null}

        {details?.description && (
          <Typography variant="body1">{renderDescription(details.description)}</Typography>
        )}

        {details?.subjects?.length ? (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {details.subjects.map((s) => (
              <Chip key={s} label={s} />
            ))}
          </Box>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default BookDetailsPage;
