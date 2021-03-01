import './App.css';
import withActionStack from './actionStack/withActionStack';
import {ActionButtons, ActionButtonsReadingFromContext} from "./ActionButtons";
import ActionStack from "./actionStack/ActionStack";

const onUpdate = value => console.log(value);
const initialValue = {
  test: true,
  test2: false,
  test3: 'test',
};
const providerProps = {
  initialValue,
  onUpdate,
};

const ButtonsWithHoc = withActionStack(ActionButtons, providerProps);


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>HOC</p>

        <ButtonsWithHoc />

        <p>Provider</p>

        <ActionStack {...providerProps}>
          <ActionButtonsReadingFromContext/>
        </ActionStack>
      </header>
    </div>
  );
}

export default App;
