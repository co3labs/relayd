import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Shell from './shell/Shell';
import Hero from './Components/Hero';
import NotFound from './Components/NotFound';
import Recharge from './modals/Recharge';
import Signup from './Components/Signup';
import Withdrawal from './modals/Withdraw';

export default function App() {
  return (
    <Router>
      <Recharge />
      <Withdrawal/>
      <Routes>
        <Route path="" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account/*" element={<Shell />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  );
}
