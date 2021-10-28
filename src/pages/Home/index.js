import React from 'react'
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import BarChart from '../../components/BarChart'
import Leaderboard from '../../components/Leaderboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import undraw_2 from "../../img/undraw_2.png"

const Home = () => {
    return (
        <div className="box">

        <div className="d-flex">
            <div className="m-2 flex-fill">
                <Paper elevation={5}>
                    <Typography variant="h3" color="primary">
                        Welcome to Quizio
                    </Typography>
                    <Typography variant="h4" color="primary">
                        How to play
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <StarBorderRoundedIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Sign up or Login" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <StarBorderRoundedIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Once signed in, create a new room or join an existing one. Host has permissions to start the game." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <StarBorderRoundedIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Once started you have 30 seconds to submit your answers before the timer runs out." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <StarBorderRoundedIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Good Luck!" />
                        </ListItem>
                    </List>
                </Paper>
            </div>
            <div className="m-2 flex-fill">
                <Leaderboard />
            </div>
        </div>
            <img src={undraw_2} className="img-main"></img> 
        </div>
    )
}

export default Home
