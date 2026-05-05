import { FormEvent, useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, Paper, Stack, Switch, TextField, Typography } from '@mui/material';
import BookList from '../components/BookList';
import BookCard from '../components/BookCard';
import { BookSummary } from '../types/bookTypes';

const FAVORITES_STORAGE_KEY = 'openLibraryFavorites';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('javascript');
  const [query, setQuery] = useState('javascript');
  const [page, setPage] = useState(1);
  const [favoriteBooks, setFavoriteBooks] = useState<BookSummary[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Handle migration from old format (array of strings) to new format (array of BookSummary)
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (typeof parsed[0] === 'string') {
            // Old format - clear it since we can't convert keys back to books
            window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
            setFavoriteBooks([]);
          } else {
            // New format
            setFavoriteBooks(parsed);
          }
        }
      }
    } catch {
      setFavoriteBooks([]);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setQuery(searchTerm.trim() || 'javascript');
  };

  const toggleFavorite = (book: BookSummary) => {
    setFavoriteBooks((prev) => {
      const exists = prev.some((item) => item.key === book.key);
      const next = exists ? prev.filter((item) => item.key !== book.key) : [...prev, book];

      try {
        window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore localStorage write failures
      }

      return next;
    });
  };

  const favoriteKeys = favoriteBooks.map((book) => book.key);

  return (
    <>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Open Library Books
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Search for books using the Open Library API.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-end">
            <TextField
              fullWidth
              label="Search books"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Enter a book title, author, or subject"
              variant="outlined"
            />
            <Button type="submit" variant="contained" size="large">
              Search
            </Button>
          </Stack>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Favorites saved locally: {favoriteBooks.length}
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={showFavoritesOnly}
                onChange={(event) => setShowFavoritesOnly(event.target.checked)}
              />
            }
            label="Show favorites only"
          />
        </Stack>
      </Paper>

      {favoriteBooks.length > 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            My Favorites
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
                lg: 'repeat(4, minmax(0, 1fr))',
              },
            }}
          >
            {favoriteBooks.map((book) => (
              <Box key={book.key} sx={{ minWidth: 0 }}>
                <BookCard
                  book={book}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      <BookList
        query={query}
        page={page}
        onPageChange={setPage}
        favoriteKeys={favoriteKeys}
        onToggleFavorite={toggleFavorite}
        showFavoritesOnly={showFavoritesOnly}
      />
    </>
  );
};

export default HomePage;
