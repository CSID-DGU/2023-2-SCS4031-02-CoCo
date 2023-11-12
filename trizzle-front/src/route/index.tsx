import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPlanPage from '../pages/AddPlan/AddPlan';
import Home from '../pages/Home';
import AddPlacePage from '../pages/AddPlace/AddPlace';
import PostPlace from '../pages/PostPlace/PostPlace';
import Myfeed from '../pages/Myfeed';
import PlanList from '../pages/PlanList';
import PlanDetail from '../pages/PlanDetail';
import MainLogin from '../pages/LoginPage/MainLogin';
import KakaoRedirectPage from '../pages/KakaoRedirectPage/KakaoRedirectPage';
import EditPlanPage from '../pages/AddPlan/ModPlan';
import UserInfoEdit from '../pages/UserInfoEdit';
import SearchPlace from '../pages/SearchPlace/SearchPlace';
import SearchPlan from '../pages/SearchPlan/SearchPlan';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Home />} />
        <Route path="/post/places/add" element={<AddPlacePage />} />
        <Route path="/mypage/plans/add" element={<AddPlanPage />} />
        <Route path="/mypage/plans/edit/:id" element={<EditPlanPage />} />

        <Route path='/Search/:place/places' element={<SearchPlace />} />
        <Route path='/Search/:plan/plans' element={<SearchPlan />} />


        <Route path="/post/places/:id" element={<PostPlace />} />
        <Route path="/post/places/secret/:id" element={<PostPlace />} />

        <Route path="/myfeed" element={<Myfeed />} />
        <Route path="/myfeed/plans" element={<PlanList />} />
        <Route path="/myfeed/plans/:id" element={<PlanDetail />} />
        <Route path="/myfeed/info" element={<UserInfoEdit />} />
        <Route path="/feed/:id" element={<Myfeed />} />

        <Route path="/login/oauth2/code/kakao" element={<KakaoRedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
