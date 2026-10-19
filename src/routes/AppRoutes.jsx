import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { LazyFallback } from './LazyFallback';
import { ROUTES } from './paths';
import Login from '../pages/auth/user/page/Login';
import RegisterWorker from '../pages/auth/worker/pages/RegisterWorker';
import HowItWorks from '../views/HowItWorks';
import OurVision from '../views/OurVision';

// Code Splitting & Dynamic Imports via React.lazy
// const userDashbord = lazy(() => import('../pages/dashboard/user'));
const NotFoundPage = lazy(() => import('../components/notFound/NotFoundPage'));
const FindJob = lazy(()=> import('../pages/job/pages/FindJob'))
const FindWorker = lazy(()=> import('../pages/Worker/pages/FindWorker'))
const Hero = lazy(()=> import('../pages/Home/pages/Hero'))
const AddNewWork = lazy(() => import('../pages/AddNewWork/pages/AddNewWork'))

export function AppRoutes() {
  return (
    <Suspense fallback={<LazyFallback label="Loading chunk bundle..." />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Hero />} />
          <Route path={ROUTES.FINDWORKER} element={<FindWorker />} />
          <Route path={ROUTES.FINDJOB} element={<FindJob />} />
          <Route path={ROUTES.ADD_WORK} element={<AddNewWork />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          <Route path={ROUTES.HOW_IT_WORK} element={<HowItWorks />} />
          <Route path={ROUTES.OUR_VISION} element={<OurVision />} />
        </Route>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTERWORKER} element={<RegisterWorker />} />
      </Routes>
    </Suspense>
  );
}


        {/* Protected Application Routes */}
        {/* <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.} replace />} />
        </Route> */}