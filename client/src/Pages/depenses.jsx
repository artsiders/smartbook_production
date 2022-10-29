import React from 'react';
import TabDepenses from '../Component/tabDepenses';
import TitleBar from '../Component/titleBar';

const Depenses = () => {
    return (
        <div className="depenses">
            <TitleBar title="les depenses"/>
            <TabDepenses
                rapport={false}
                children={""}
            />
        </div>
    );
};

export default Depenses;