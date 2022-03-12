import React from "react";

import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./pages";
import { persistor, store } from "./redux";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

export default App;
