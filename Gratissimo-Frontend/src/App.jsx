import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router";
import FrontPage from "./pages/frontpage/FrontPage";
import NewsPage from "./pages/newspage/NewsPage";
import SearchResults from "./pages/searchresults/SearchResults";
import CreateAdvertisement from "./pages/createadvertisement/CreateAdvertisement";
import Login from "./pages/auth/loginpage/Login";
import MyPage from "./pages/mypage/MyPage";
import EditPage from "./pages/mypage/EditPage/EditPage";
import MyFavorites from "./pages/mypage/myfavorites/MyFavorites";
import { Layout } from "./components/Layout/Layout";
import NewsListPage from "./components/NewsListPage/NewsListPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/news" element={<NewsListPage />} />
            <Route path="/news/:id" element={<NewsPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/create-ad" element={<CreateAdvertisement />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login initialMode="register" />} />
            {/* My Page section - nested routes */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/edit" element={<EditPage />} />
            <Route path="/mypage/favorites" element={<MyFavorites />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
