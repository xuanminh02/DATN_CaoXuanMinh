import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContainerSocket from "./ContainerSocket/ContainerSocket";
import { HelmetProvider } from "react-helmet-async";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import "./style.sass";
import "./responsive.sass";
import "./transition.sass";
import "./eff.sass";
import "react-calendar/dist/Calendar.css";
import { SERVER_URL } from "./config/config";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
    connectionParams: {},
  })
);
const httpLink = new HttpLink({
  uri: `${SERVER_URL}/api/graphql`,
});
const uploadLink = new createUploadLink({
  uri: `${SERVER_URL}/api/graphql`,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
  uploadLink
);
const client = new ApolloClient({
  uri: `${SERVER_URL}/api/graphql`,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: splitLink,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <ContainerSocket>
        <App />
      </ContainerSocket>
    </HelmetProvider>
  </ApolloProvider>
);

reportWebVitals();
