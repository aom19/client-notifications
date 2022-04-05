import { configureStore } from "@reduxjs/toolkit";

import partnersReducer from "../redux/reducers/partners";
import userReducer from "../redux/reducers/auth";
import contactReducer from "../redux/reducers/contact";

export default configureStore(
  {
    reducer: {
      user: userReducer,
      partners: partnersReducer,
      contact: contactReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
