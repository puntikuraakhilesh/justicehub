import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './pages/auth/AuthContext'; // Import AuthProvider
import {Provider} from 'react-redux'
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>

      <AuthProvider>  {/* Wrap your app with AuthProvider */}
        <App />
      </AuthProvider>

  </Provider>
 
);
