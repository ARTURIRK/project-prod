import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface Props {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
  children: ReactNode;
}

export const DynamicModuleLoader = ({
    children,
    reducers,
    removeAfterUnmount = true,
}: Props) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const currentReducers = store.reducerManager.getReducerMap();
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = currentReducers[name as StateSchemaKey];
            // Добавляем новый редьюсер, если его нет
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
    // eslint-disable-next-line
    }, []);

    return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
};
