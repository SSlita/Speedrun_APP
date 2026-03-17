import { Route, Routes } from 'react-router';

import HomePage from '../pages/HomePage';
import CategoriesPage from '../pages/CategoriesPage';
import GuidePage from '../pages/GuidePage';
import CreateGame from '../pages/CreateGame';
import CreateCategory from '../pages/CreateCategory';
import CreateGuide from '../pages/CreateGuide';
import GameDetail from '../pages/GameDetail';
import CategoryDetail from '../pages/CategoryDetail';
import GuideDetail from '../pages/GuideDetail';

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:gameId" element={<CategoriesPage />} />
        <Route path="/category/:categoryId" element={<GuidePage />} />
        <Route path="/createGame" element={<CreateGame />} />
        <Route path="/game/:gameId/createCategory" element={<CreateCategory />} />
        <Route path="/category/:categoryId/createGuide" element={<CreateGuide />} />
        <Route path="/detailGame/:gameId" element={<GameDetail />} />
        <Route path="/detailCategory/:categoryId" element={<CategoryDetail />} />
        <Route path="/detailGuide/:guideId" element={<GuideDetail />} />
      </Routes>
    </div>
  )
}

export default Router;