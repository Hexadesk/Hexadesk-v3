import React from 'react';
import Routes from './Router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import configStore from './store';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtoolsPanel } from "react-query/devtools";
const queryClient = new QueryClient();
const { store, persistor } = configStore();
function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtoolsPanel /> */}
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
