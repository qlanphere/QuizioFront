import React from 'react'
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon} from '@mui/material'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import BarChart from '../../components/BarChart'
import Leaderboard from '../../components/Leaderboard'
const Home = () => {
    return (
        <>
            <Paper elevation={3}>
                <Typography variant="h3" color="primary">
                    Welcome to Quizio
                </Typography>
                <Typography variant="h4" color="primary">
                    How to play
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <StarBorderRoundedIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Do one thing"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <StarBorderRoundedIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Do one thing"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <StarBorderRoundedIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Do one thing"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <StarBorderRoundedIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Do one thing"/>
                    </ListItem>
                </List>

            </Paper>
                    <div>
                        <h1>Welcome to Quizio!</h1>
                        <h2>Instructions:</h2>
                <BarChart />
                <Leaderboard />
                        
                    </div>
        </>


        

    )}

export default Home
