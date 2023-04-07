import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import BasicTable from './Pages/Home';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from './Pages/Details';
import Favorite from './Pages/Favorite';
import { ReactQueryDevtools } from 'react-query/devtools'
import './styles/Home.scss'

function App() {

  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path ="/" element={<BasicTable />} />
            <Route path="/:id" element={<Details />} />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
);
}

export default App
