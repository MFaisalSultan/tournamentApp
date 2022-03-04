import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import Game from '../components/game'
import Home from './Home';
import History from './History';

const index = () => {
    return (
        <Layout>
            <Router>
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </Router>
        </Layout>
    )
}

export default index