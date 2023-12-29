import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore } from './config/store';
import type { AppDispatch } from './config/store';
import type { StateSchema, ThunkExtraArg, ThunkConfig } from './config/StateSchema';

export {
    StoreProvider,
    createReduxStore,
    ThunkExtraArg,
    ThunkConfig,
    StateSchema,
    AppDispatch,
};
