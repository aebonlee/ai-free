import { lazy, Suspense, type ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import site from '../config/site';

// 핵심 페이지
const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Auth 페이지 (dasco 인프라 상속)
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const MyPage = lazy(() => import('../pages/MyPage'));

// AI Free 전용 페이지
const Tools = lazy(() => import('../pages/Tools'));
const ToolGuide = lazy(() => import('../pages/ToolGuide'));
const Examples = lazy(() => import('../pages/Examples'));
const Playground = lazy(() => import('../pages/Playground'));
const AdminAllocation = lazy(() => import('../pages/AdminAllocation'));
const RecommendedSites = lazy(() => import('../pages/RecommendedSites'));
const AboutPage = lazy(() => import('../pages/About'));
const InstructorIntro = lazy(() => import('../pages/InstructorIntro'));

const Loading = (): ReactElement => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div className="loading-spinner"></div>
  </div>
);

const PublicLayout = (): ReactElement => {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Auth */}
            {site.features.auth && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/mypage" element={<AuthGuard><MyPage /></AuthGuard>} />
              </>
            )}

            {/* AI 도구 가이드 */}
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:provider" element={<ToolGuide />} />

            {/* 학습 예제 (수준별) */}
            <Route path="/examples" element={<Examples />} />
            <Route path="/examples/:level" element={<Examples />} />

            {/* 실습실 (로그인 필요) */}
            <Route path="/playground" element={<AuthGuard><Playground /></AuthGuard>} />

            {/* 강사용 토큰 배당 관리 */}
            <Route path="/admin/allocation" element={<AuthGuard><AdminAllocation /></AuthGuard>} />

            {/* About */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/instructor" element={<InstructorIntro />} />

            {/* 추천사이트 */}
            <Route path="/recommended" element={<RecommendedSites />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
