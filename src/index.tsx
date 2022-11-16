import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
// @ts-expect-error IGNORE
const root = createRoot(container);

root.render(<App />);