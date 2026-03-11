import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import Tips from './pages/Tips';
import History from './pages/History';
import Learn from './pages/Learn';
import { CarbonProvider } from './store/CarbonContext';
import './index.css';

function App() {
    return (
        <Router>
            <CarbonProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="calculator" element={<Calculator />} />
                        <Route path="tips" element={<Tips />} />
                        <Route path="learn" element={<Learn />} />
                        <Route path="history" element={<History />} />
                    </Route>
                </Routes>
            </CarbonProvider>
        </Router>
    );
}

export default App;
