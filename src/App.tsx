import { Home } from './pages'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { toast } from 'react-toastify'
// import NavBar from './components/NavBar';
import React, { useMemo } from 'react';
import Post from './pages/Article';
import { ThemeProvider } from 'degen';
// import MyArticles from 'pages/MyArticles';
// import NavBar from 'components/NavBar';
import Editor from 'pages/Editor';
import AuthorPage from 'pages/Author';
import ClaimedPosts from 'pages/CliamedPosts';
import Subscribers from 'pages/Subscribers';
// import AuthorDashboard from 'pages/AuthorDashboard';
import MyArticles from 'pages/MyArticles';
// import Editor from 'pages/Editor';
// import Subscribers from 'pages/Subscribers';
import Auth from 'components/Auth';
// import ClaimedPosts from 'pages/CliamedPosts';

function App() {
  return (
      <Router>
        {/* <NavBar /> */}
        <Routes>
          <Route 
            path="/dashboard" 
            element={
              <Auth>
                <ThemeProvider>
                  <MyArticles />    
                </ThemeProvider>
              </Auth>
            } 
          />
          <Route 
            path="/subscribers" 
            element={
              <Auth>
                <ThemeProvider>
                  <Subscribers />    
                </ThemeProvider>
              </Auth>
            } 
          />
          <Route 
            path="/claimed-posts" 
            element={
              <Auth>
                <ThemeProvider>
                  <ClaimedPosts />    
                </ThemeProvider>
              </Auth>
            } 
          />
          <Route
            path="/:id"
            element={
              <AuthorPage />
            }
          />
          <Route
            path="/"
            element={
              <ThemeProvider>
                <Home />
              </ThemeProvider>
            }
          />
          <Route
            path="/:authorId/:articleId"
            element={
              <ThemeProvider>
                <Post />
              </ThemeProvider>
            }
          />
          <Route
            path="/write"
            element={
            <Auth>
              <Editor />
            </Auth>
            }
          /> 
        </Routes>
      </Router>
  );
}

export default App;
