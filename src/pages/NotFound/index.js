import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const history = useHistory();

    return <p>Oops we can't find {history.location.pathname}!</p>
}

export default NotFound;