import './App.css';
import Loading from './components/blocks/Loading';
import Main from './components/Main';
import ContextProvider from './contexts/Context';

export default function App() {
    return (
        <ContextProvider>
            <div className="App">
                <Main />
                <div id='Msg'></div>
                <div id='Lod'>
                    <Loading />
                </div>
            </div>
        </ContextProvider>
    );
}

