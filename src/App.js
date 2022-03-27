import Compare from "./Screens/Compare";

import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Compare />
      </div>
    </Provider>
  );
}

export default App;
