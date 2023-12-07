import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPlanPage from '../pages/AddPlan/AddPlan';
import Home from '../pages/Home';
import AddPlacePage from '../pages/AddPlace/AddPlace';
import PostPlace from '../pages/PostPlace/PostPlace';
import Myfeed from '../pages/Myfeed';
import MorePosts from '../pages/Myfeed/MorePosts';
import MoreReviews from '../pages/Myfeed/MoreReviews';
import PlanList from '../pages/PlanList';
import PlanDetail from '../pages/PlanDetail';
import KakaoRedirectPage from '../pages/KakaoRedirectPage/KakaoRedirectPage';
import EditPlanPage from '../pages/AddPlan/ModPlan';
import UserInfoEdit from '../pages/UserInfoEdit';
import SearchPlace from '../pages/SearchPlace/SearchPlace';
import SearchPlan from '../pages/SearchPlan/SearchPlan';
import AddPostPlan from '../pages/AddPostPlan/AddPostPlan';
import PostPlan from '../pages/PostPlan/PostPlan';
import GoogleRedirectPage from '../pages/GoogleRedirectPage/GoogleRedirectPage';
import ConnectPlace from '../pages/AddPlace/ConnectPlace';
import AddPostPlanOpen from '../pages/AddPostPlan/AddPostPlanOpen';
import Bookmark from '../pages/Bookmark';
import FQA from '../pages/FQA';
import PersonalInformationPage from '../pages/PersonalInformationPage';
import ModPostPlan from '../pages/AddPostPlan/ModPostPlan';
import Page404 from '../pages/Page404/Page404';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/post/places/add" element={<AddPlacePage />} />
          <Route path="/post/places/modify/:id" element={<AddPlacePage />} />
          <Route path="/mypage/plans/add" element={<AddPlanPage />} />
          <Route path="/mypage/plans/edit/:id" element={<EditPlanPage />} />

          <Route path='/search/:region/places' element={<SearchPlace />} />
          <Route path='/search/:region/plans' element={<SearchPlan />} />

          <Route path='/post/plans/add' element={<AddPostPlanOpen />} />
          <Route path='/post/plans/add/:id' element={<AddPostPlan />} />
          <Route path='/post/plans/modify/:id' element={<ModPostPlan />} />
          <Route path="/post/modifiedPlans/add/:planDay/:planId/:placeId" element={<ConnectPlace />} />
          <Route path="/post/plans/add/:planDay/:planId/:placeId" element={<ConnectPlace />} />
          <Route path='/post/plan/:id' element={<PostPlan />} />

          <Route path="/post/places/:id" element={<PostPlace />} />

          <Route path="/myfeed" element={<Myfeed />} />
          <Route path="/myfeed/posts" element={<MorePosts />} />
          <Route path="/myfeed/reviews" element={<MoreReviews />} />
          <Route path="/myfeed/plans" element={<PlanList />} />
          <Route path="/myfeed/plans/:id" element={<PlanDetail />} />
          <Route path="/myfeed/info" element={<UserInfoEdit />} />
          <Route path="/feed/:id" element={<Myfeed />} />
          <Route path="/feed/:id/posts" element={<MorePosts />} />
          <Route path="/feed/:id/reviews" element={<MoreReviews />} />
          <Route path="/myfeed/bookmarks" element={<Bookmark />} />

          <Route path="/login/oauth2/code/kakao" element={<KakaoRedirectPage />} />
          <Route path="/login/oauth2/code/Google" element={<GoogleRedirectPage />} />

          <Route path='/help' element={<FQA />} />
          <Route path='/information/service' element={<></>} />
          <Route path='/information/personal' element={<PersonalInformationPage />} />

          <Route path='/404' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;