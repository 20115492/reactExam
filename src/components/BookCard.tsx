import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { BookSummary } from '../types/bookTypes';
import { coverUrl } from '../api/openLibraryApi';

const BookCard = ({ book }: { book: BookSummary }) => {
  const to = `/books${book.key.startsWith('/works') ? book.key.replace('/works', '') : book.key}`;
  const cover = coverUrl(book.cover_i, 'M');

  return (
    <Card
      key={book.key}
      component={Link}
      to={to}
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
        width: '100%',
      }}
    >
      <CardHeader
        avatar={<Avatar src={coverUrl(book.cover_i, 'S')}>{book.title?.[0]}</Avatar>}
        title={book.title}
        subheader={book.author_name?.join(', ')}
      />

      {cover ? (
        <CardMedia
          component="img"
          image={cover}
          alt={book.title}
          sx={{
              height: 220,
              width: '100%',
              objectFit: 'contain',
              backgroundColor: 'grey.100',
          }}
        />
      ) : null}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {book.first_publish_year ? `First published in ${book.first_publish_year}` : 'Open Library result'}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" component={Link} to={to}>
          View details
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
