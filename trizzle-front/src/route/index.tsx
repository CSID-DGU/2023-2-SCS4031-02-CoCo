import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPlanPage from '../pages/UserPlan/AddPlan';
import Home from '../pages/Home';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage/plans/add" element={<AddPlanPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
