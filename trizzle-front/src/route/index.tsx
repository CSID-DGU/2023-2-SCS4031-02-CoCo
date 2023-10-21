import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPlanPage from '../pages/AddPlan/AddPlan';
import Home from '../pages/Home';
import AddPlacePage from '../pages/UesrPlace/AddPlace';
import PostPlace from '../pages/PostPlace/PostPlace';
import Myfeed from '../pages/Myfeed';
import PlanList from '../pages/PlanList';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/plan/addPlan" element={<AddPlanPage />} />
        <Route path="/post/places/add" element={<AddPlacePage />} />
        <Route path="/post/places/:id"  element={<PostPlace />} />
        <Route path="/mypage/plans/add" element={<AddPlanPage />} />


        <Route path="/myfeed" element={<Myfeed />} />
        <Route path="/myfeed/plans" element={<PlanList />} />
        <Route path="/feed/:id" element={<Myfeed />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
