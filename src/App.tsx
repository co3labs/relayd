import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Account from './Components/Account';
import Dashboard from './Components/Dashboard';
import Hero from './Components/Hero';
import NotFound from './Components/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Hero />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  );
}
