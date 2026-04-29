import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import SiteHeader from './components/SiteHeader';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';



const App= () => {
    return(
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <SiteHeader />
          <Container component="main" sx={{ py: 4 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books/:id" element={<BookDetailsPage />} />
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    )
    
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
