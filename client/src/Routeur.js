import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "./Pages/home";
import Analytics from "./Pages/analytics";
import Notifications from "./Pages/notifications";
import Depenses from './Pages/depenses';
import Recettes from './Pages/recettes';
import Helps from './Pages/helps';
import Settings from './Pages/settings';
import NotFound from './Pages/notFound';
import EmployeesPage from './Pages/employees.page';
import Rapport from './Pages/rapport';
import Admin from './Pages/admin';

const Routeur = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>

            <Route path="/home">
                <Home/>
            </Route>

            <Route path="/analytics">
                <Analytics/>
            </Route>

            <Route path="/notifications" component={Notifications}></Route>

            <Route exact path="/recettes" >
                <Recettes />
            </Route>
            <Route path="/recettes/:depart" >
                <Recettes />
            </Route>

            <Route path="/depenses" >
                <Depenses/>
            </Route>

            <Route path="/helps" component={Helps}></Route>

            <Route path="/rapport">
                <Rapport print={false} />
            </Route>
            <Route path="/admin">
                <Admin />
            </Route>

            <Route path="/settings" component={Settings}></Route>
            <Route path="/employees" component={EmployeesPage}></Route>
            <Route component={NotFound}></Route>
        </Switch>
    );
};

export default Routeur;