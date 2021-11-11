import { Provider } from 'react-redux';
import store from './redux/store';
import Base from './components/general/Base';

function App() {

  return (
    <div className="App APP1">
      <Provider store={store}>
        <Base />
      </Provider >
    </div >
  );
}
export default App;