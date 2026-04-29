import { Container, Paper, Stack, Typography } from '@mui/material';
import BookList from '../components/BookList';

const HomePage = () => {
  return (
    <>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Open Library Books
          </Typography>
          <Typography variant="body1">
            A small live search demonstration using the Open Library Search API.
          </Typography>
        </Paper>

        <BookList query="javascript" />
     </>
  );
};

export default HomePage;
