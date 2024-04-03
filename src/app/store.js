import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './productsApi';

export const store = configureStore({
  reducer: {
    // Integrerer API-reduceren med Redux store. Dette gør det muligt for appen at opbevare og administrere tilstanden
    // for API-data centralt.
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Tilføjer RTK Query middleware til Redux middleware-kæden. Dette middleware håndterer automatisk udførelsen
    // af asynkrone forespørgsler og caching af resultater.
    getDefaultMiddleware().concat(productsApi.middleware),
});
