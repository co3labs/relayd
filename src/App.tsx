import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Shell from './Components/Shell';
import Hero from './Components/Hero';
import NotFound from './Components/NotFound';
import Recharge from './Components/Recharge';
import Signup from './Components/Signup';

export default function App() {
  return (
    <Router>
      <Recharge/>
      <Signup/>
      <Routes>
        <Route path="" element={<Hero />} />
        <Route path="/account/*" element={<Shell />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  );
}
