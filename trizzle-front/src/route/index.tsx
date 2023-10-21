import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPlanPage from '../pages/UserPlan/AddPlan';
import Home from '../pages/Home';
import AddPlacePage from '../pages/UesrPlace/AddPlace';
import PostEditor from '../pages/UesrPlace/PostEditor';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/plan/addPlan" element={<AddPlanPage />} />
        <Route path="/post/places/add" element={<AddPlacePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
