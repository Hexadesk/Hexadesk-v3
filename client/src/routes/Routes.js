import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexKanban from '../view/KanbanBoard';

// pages
import { DashBoard } from '../view/pages/dashboard/DashBoard';
import { Members } from '../view/pages/members/Members';
import { PersonalBoard } from '../view/pages/personal-board/PersonalBoard';

export const Routes = () => {
  return (
    <section
      className='scroll-box rounded-lg bg-light p-3'
      style={{ height: '70%' }}
    >
      <Switch>
        <Route exact path='/' component={IndexKanban} />
        <Route exact path='/members' component={Members} />
        <Route exact path='/dashboard' component={DashBoard} />
        <Route exact path='/personal-board' component={PersonalBoard} />
      </Switch>
    </section>
  );
};
