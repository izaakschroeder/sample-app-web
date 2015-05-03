
import React, { render } from 'react';
import Application from './app';

const element = document.getElementById('content');
const props = window.__state__;

render(<Application {...props}/>, element);
