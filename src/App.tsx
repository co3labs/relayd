import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AccountShell from './Components/AccountShell';
import Dashboard from './Components/Dashboard';
import Hero from './Components/Hero';
import NotFound from './Components/NotFound';
import Recharge from './Components/Recharge';

export default function App() {
  return (
    <Router>
      <Recharge/>
      <Routes>
        <Route path="" element={<Hero />} />
        <Route path="/account/*" element={<AccountShell />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  );
}
