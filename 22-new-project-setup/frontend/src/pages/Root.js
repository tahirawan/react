import {Outlet, useNavigation} from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
    // const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
          {/*{ navigation.state === 'loading' && <p>Loading...</p>}*/}
          <Outlet />
      </main>
      <footer>
        <p>Footer content here</p>
      </footer>
    </>
  );
}

export default RootLayout;
