import routers from "/@/routers";
import { RouterProvider } from 'react-router-dom';

import "./styles/index.scss";

function App() {

  return (
      <>
          <RouterProvider router = { routers } future = {{ v7_startTransition: true, }} />
      </>
  )
}

export default App;
