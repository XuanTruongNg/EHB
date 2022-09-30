import { GetCurrentUserWrapper } from 'common/HOC/GetCurrentUser';
import Routes from 'core/routes/Routes';

function App() {
  return (
    <GetCurrentUserWrapper>
      <div className="">
        <Routes />
      </div>
    </GetCurrentUserWrapper>
  );
}

export default App;
