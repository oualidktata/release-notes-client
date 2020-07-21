import "../fake-db";
import "../styles/_app.scss";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import AppContext from "./appContext";
import history from "history.js";

import routes from "./RootRoutes";
import { Store } from "./redux/Store";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayout";
import AuthGuard from "./auth/AuthGuard";
import {ApolloClient,ApolloProvider,InMemoryCache,HttpLink} from "@apollo/client";

const App = () => {

  const cache= new InMemoryCache();
  const cache2= new InMemoryCache();
  const link= new HttpLink({
    // uri: "https://cors-anywhere.herokuapp.com/http://localhost:52146/graphql"
    uri:"https://48p1r2roz4.sse.codesandbox.io/"
  });
  const linkVersions= new HttpLink({
    // uri: "http://localhost:52146/" //dotnet core API
    uri:" http://localhost:4000/" //apollo server
    //uri:"https://48p1r2roz4.sse.codesandbox.io/"
  });
    const clientSandBox = new ApolloClient({
      
      link: link,
      cache:cache
      //headers:{
      //   "Access-Control-Allow-Origin":"*",
      //   "origin":"http://localhost:3000",
      //   "Content-Type":"application/json",
      //   "Accept":"application/json"
  
      // }
    });
    const clientVersions = new ApolloClient({
      
      link: linkVersions,
      cache:cache2,
      //  headers:{
      //    "Access-Control-Allow-Origin":"*",
      //   "origin":"http://localhost:3000",
      //    "Content-Type":"application/x-ww-form-urlencoded",
      //   "Accept":"application/json"
  
      //  }
    });

  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <MatxTheme>
          <Auth>
            <Router history={history}>
              <AuthGuard>
                <ApolloProvider client={clientVersions}>
                <MatxLayout />
                </ApolloProvider>
              </AuthGuard>
            </Router>
          </Auth>
        </MatxTheme>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
