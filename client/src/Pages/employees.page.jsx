import React from 'react';
import Employees from '../Component/employees';
import TabSalaires from '../Component/tabSalaires';

const EmployeesPage = () => {
    return (
        <div className="employees_page">
            <Employees conpact={false} />
            <TabSalaires />
        </div>
    );
};

export default EmployeesPage;