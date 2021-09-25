import React, { useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import ProtectedRoutes from "./hoc/ProtectedRoutes";
import { ToastContainer } from "./components/Toast";
import IndexKanban from "./view/KanbanBoard";
import { SignIn } from "./view/AuthForms/SignIn";
import { SignUp } from "./view/AuthForms/SignUp";
import { ForgotPassword } from "./view/AuthForms/ForgotPassword";
// pages
import { DashBoard } from "./view/pages/dashboard/DashBoard";
import { Members } from "./view/pages/members/Members";
// import { Header } from "./view/components/header/Header";
import { Sidebar } from "./view/components/Sidebar";
// import { BadgeContainer } from "./view/components/BadgeContainer";
// import { HeaderDashboardComponent } from "./view/components/header/HeaderDashboardComponent";
import Navbar from "./view/components/Navbar";
import { PersonalBoard } from "./view/pages/personal-board/PersonalBoard";
import StripeForm from "./view/Stripe";
import { Profile } from "./view/pages/profile/Profile";
import InvitedMembers from "./view/pages/InviteMembers";
import SingleLinkView from "./view/pages/SingleLinkView";
import { ItemViewPage } from "./view/pages/item-view/ItemViewPage";
function Router({ location }) {
  const [sidebarState, setSidebarState] = useState(false);
  return (
    <div className="d-flex custom-container-xxl px-0 bg-white">
      <Sidebar
        onHide={() => setSidebarState(false)}
        location={location}
        className={sidebarState ? `sidebar-toggle-show` : `sidebar-toggle-hide`}
      />

      <div className="col">
        <ToastContainer />
        <Switch>
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/forgot-password" component={ForgotPassword} />

          <ProtectedRoutes>
            <Route exact path="/payment" component={StripeForm} />
            <Navbar
              location={location}
              ToggleSideBar={() => setSidebarState(!sidebarState)}
            />
            {/* <Header location={location} /> */}
            {/* <BadgeContainer location={location} /> */}

            <section className="rounded-lg bg-light p-3">
              {/* <Route exact path='/item-view' component={ItemViewPage} /> */}
              <Route exact path="/" component={PersonalBoard} />
              <Route exact path="/dashboard-items" component={DashBoard} />
              <Route exact path="/members" component={Members} />
              <Route exact path="/dashboard" component={IndexKanban} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/invite-members" component={InvitedMembers} />
              <Route
                exact
                path="/dashboard-items/view-item"
                component={ItemViewPage}
              />
            </section>
          </ProtectedRoutes>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Router);
