

import React from 'react';

import moment from "moment";
import "moment/locale/tr";


type MainFrameProps = {
    date: string | undefined | null;
};

const Moment: React.FC<MainFrameProps> = ({ date }) => {
    return (
        date === null || date === undefined ? "" : <> {moment(date).format("DD / MM / YYY HH:mm")} </>
    );
};

export default Moment;