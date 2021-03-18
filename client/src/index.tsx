import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from "App";

import { typeDefs, resolvers, GET_CART_ITEMS } from "./graphql/resolvers";

import GlobalStyles from 'utils/styles/globalStyles';
import { store, persistor } from 'utils/redux/store';

import CartProvider from "providers/cart/cart.provider";
import { GET_CART_HIDDEN } from 'graphql/resolvers';


const client = new ApolloClient( {
  uri: 'https://crwn-clothing.com',
  cache: new InMemoryCache(),
  typeDefs, 
  resolvers
} );

client.writeQuery( {
  query: GET_CART_HIDDEN,
  data: {
    cartHidden: true
  }
} );
client.writeQuery( {
  query: GET_CART_ITEMS,
  data: {
    cartItems: []
  }
} );

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <CartProvider>
          
          <BrowserRouter>
            <PersistGate persistor={persistor}>
              <GlobalStyles/>
              <App />
            </PersistGate>
          </BrowserRouter>
        </CartProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById( 'root' )
);




