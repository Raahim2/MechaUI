import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import PublishComponentForm from "./Pages/PublishComponentForm"; 
import ComponentDetail from "./Pages/ComponentDetail";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import EditorComponent from "./Pages/Editor";
import AllComponents from "./Pages/AllComponents";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* Protected Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn redirectUrl="/dashboard" />
              </SignedOut>
            </>
          }
        />

        {/* Protected Editor route */}
        <Route
          path="/editor"
          element={
            <>
              <SignedIn>
                <EditorComponent />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn redirectUrl="/editor" />
              </SignedOut>
            </>
          }
        />
        

        {/* NEW: Protected Publish route */}
        <Route
          path="/publish"
          element={
            <>
              <SignedIn>
                <PublishComponentForm />
              </SignedIn>
              <SignedOut>
                {/* Redirect to sign-in, but after signing in, they should land on the publish page */}
                <RedirectToSignIn redirectUrl="/publish" /> 
              </SignedOut>
            </>
          }
        />

        <Route path="/component/:id" element={<ComponentDetail />} />
        <Route path="/components" element={<AllComponents />} />


        {/* Clerk sign-in and sign-up pages */}
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;