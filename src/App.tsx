import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { Global } from '@emotion/react';
import { message } from 'antd';
import { globalCss } from 'styles/globalStyle';
import { AppRouter } from 'AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => message.error(error.message),
  }),
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Global styles={globalCss} />
      <RouterProvider router={AppRouter} />
    </QueryClientProvider>
  );
}

export default App;
