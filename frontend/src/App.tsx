import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RepositoryProvider } from './contexts/RepositoryContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { ImportRepo } from './pages/ImportRepo';
import { RepositoryView } from './pages/RepositoryView';
import { AIChatPage } from './pages/AIChatPage';
import { SecurityAnalysisPage } from './pages/SecurityAnalysisPage';
import { PerformanceAnalysisPage } from './pages/PerformanceAnalysisPage';
import { CodeQualityPage } from './pages/CodeQualityPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { ApiExplorerPage } from './pages/ApiExplorerPage';
import { DatabasePage } from './pages/DatabasePage';
import { DocumentationPage } from './pages/DocumentationPage';
import { TestsPage } from './pages/TestsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { BillingPage } from './pages/BillingPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <RepositoryProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<LoginPage />} />

                {/* Protected Dashboard Layout Pages */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Dashboard />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/import"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ImportRepo />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/repository"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <RepositoryView />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <AIChatPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analysis/security"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <SecurityAnalysisPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analysis/performance"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <PerformanceAnalysisPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analysis/quality"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <CodeQualityPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/architecture"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ArchitecturePage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/api-explorer"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ApiExplorerPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/database"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <DatabasePage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/documentation"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <DocumentationPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tests"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <TestsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ProfilePage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <SettingsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/billing"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <BillingPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </RepositoryProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
