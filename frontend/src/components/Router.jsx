import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage';
import CategoriesPage from '../pages/CategoriesPage';
import GuidePage from '../pages/GuidePage';
import GuideDetail from '../pages/GuideDetail';

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:gameId" element={<CategoriesPage />} />
        <Route path="/category/:categoryId" element={<GuidePage />} />
        <Route path="/detailGuide/:guideId" element={<GuideDetail />} />
      </Routes>
    </div>
  )
}
export default Router;
