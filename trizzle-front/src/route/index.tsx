import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPlanPage from '../pages/UserPlan/AddPlan';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/addPlan" element={<AddPlanPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
