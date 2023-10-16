import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPlanPage from '../pages/UserPlan/AddPlan';
import Home from '../pages/Home';
import AddPlacePage from '../pages/UserPlace/AddPlace';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/plan/addPlan" element={<AddPlanPage />} />
        <Route path="/:id/plan/addPlace" element={<AddPlacePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
