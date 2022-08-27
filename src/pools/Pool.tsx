import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export default function Pool() {
  const {currentPool}= useContext(GlobalContext)
  return currentPool?  (
    <section className="p-6 text-gray-800">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <Link to="/account/pools">Pools</Link>
          </li>
         <li>
            {currentPool.name}
         </li>
        </ol>
      </nav>
      <h2></h2>
    </section>
  ):<></>
}
