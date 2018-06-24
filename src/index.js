import dva from 'dva';
import createLoading from 'dva-loading';
import { message } from 'antd';
import configModel from './models/config';
import './index.css';

import 'antd/dist/antd.min.css';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  onError(error) {
    if (error && error.message) {
      message.error(error.message);
    } else {
      message.error(JSON.stringify(error));
    }
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(configModel);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
