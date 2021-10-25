import React, { useState, useContext } from 'react';

const GameContext = React.createContext();

return (
    <GameContext.Provider value={auth}>
        { children }
    </GameContext.Provider>
)

