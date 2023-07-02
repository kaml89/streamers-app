import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StreamerListPage from './pages/streamers-list';
import StreamerDetails from './pages/streamer-details';
import NotFound from './pages/not-found';
import { ThemeProvider, createTheme } from '@mui/material';

const queryClient = new QueryClient();
const defaultTheme = createTheme();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <Routes>
            <Route path='/' element={<StreamerListPage />} />
            <Route path='/streamer/:streamerId' element={<StreamerDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
