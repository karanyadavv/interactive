import { Routes, Route, Link } from 'react-router-dom';
import StoreLocator from '../components/StoreLocator';
import ValidatedForm from '../components/ValidatedForm';
import './App.css';
import storeData from '../src/data/re.json';


function App() {
  return (
    <div className='container mx-auto p-4'>
      <nav className="flex space-x-4 mb-6">
        <Link
          to="/"
          className="px-2 py-2 rounded text-white font-semibold bg-gray-400 hover:bg-gray-500"
        >
          Store Locator
        </Link>
        <Link
          to="/form"
          className="px-2 py-2 rounded text-white font-semibold bg-gray-400 hover:bg-gray-500"
        >
          Validated Form
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<StoreLocator storeData={storeData} />} />
        <Route path="/form" element={<ValidatedForm />} />
      </Routes>
    </div>
  );
}

export default App;