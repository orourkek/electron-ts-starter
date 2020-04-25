import * as React from 'react';
import { render } from 'react-dom';
import { Application } from './components/Application';

import './style/global.scss';

render(<Application />, document.getElementById('mount-point'));
