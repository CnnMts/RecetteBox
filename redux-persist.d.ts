declare module 'redux-persist/integration/react' {
    import React from 'react';
    export class PersistGate extends React.Component<{
        loading: React.ReactNode;
        persistor: any;
        children?: React.ReactNode;
    }> {}
}