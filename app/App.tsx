import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './stores';
import AppNavigator from './navigation/appNavigation';
import { setSystemTheme } from './stores/themeSlice';

function ThemeSyncWrapper({ children }: { children: React.ReactNode }) {
    const systemScheme = useColorScheme(); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSystemTheme(systemScheme === 'dark'));
    }, [systemScheme, dispatch]);

    return <>{children}</>;
}

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeSyncWrapper>
                    <AppNavigator />
                </ThemeSyncWrapper>
            </PersistGate>
        </Provider>
    );
}