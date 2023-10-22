import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPlanPage from '../pages/AddPlan/AddPlan';
import Home from '../pages/Home';
import Myfeed from '../pages/Myfeed';
import PlanList from '../pages/PlanList';
import PlanDetail from '../pages/PlanDetail';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myfeed/plans/add" element={<AddPlanPage />} />


        <Route path="/myfeed" element={<Myfeed />} />
        <Route path="/myfeed/plans" element={<PlanList />} />
        <Route path="/myfeed/plans/:id" element={<PlanDetail />} />
        
        <Route path="/feed/:id" element={<Myfeed />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
