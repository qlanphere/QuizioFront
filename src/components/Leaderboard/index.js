import React, { useState, useEffect } from "react";
import PlayerScoreCard from "../PlayerScoreCard";
import { Paper } from '@mui/material'
import Filter1Icon from '@mui/icons-material/Filter1'
import Filter2Icon from '@mui/icons-material/Filter2'
import Filter3Icon from '@mui/icons-material/Filter3'
import Filter4Icon from '@mui/icons-material/Filter4'
import Filter5Icon from '@mui/icons-material/Filter5'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'


const Leaderboard = () => {
    const [data, setData] = useState([])

    //must be empty array otherwise map not a function

    useEffect(() => {
        if (!data.length) {
            retrieve()
        }
    }, [])

    async function retrieve() {
        const response = await fetch('http://localhost:3000/user/leaderboard')
        const data2 = await response.json()

        if (data2.length >= 5) {
            setData(data2.slice(0, 5))
        } else {
            setData(data2)
        }
        console.log(data)

    }

    const userNames = data.map(user => user.username)
    const totalScores = data.map(user => user.total_scores)
    const totalGames = data.map(user => user.total_games)
    console.log(totalGames)
    console.log(totalScores)
    console.log(userNames)



    //const Lines = leaderboard.map( line => line*2)
    //console.log(Lines)

    // {leaderboard.map((line,i) => <PlayerScoreCard key={i}  line={line} />)}
    return (
        <>
            <Paper elevation={5}>
                <h2>Top Five Players Ever</h2>
                <MDBTable hover>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Rank</th>
                            <th scope='col'>Username</th>
                            <th scope='col'>Total Score</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                            <th scope='row'>
                                <Filter1Icon color="primary" />
                            </th>
                            <td>{userNames[0]}</td>
                            <td>{totalScores[0]}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                <Filter2Icon color="primary" />
                            </th>
                            <td>{userNames[1]}</td>
                            <td>{totalScores[1]}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                <Filter3Icon color="primary" />
                            </th>
                            <td>{userNames[2]}</td>
                            <td>{totalScores[2]}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                <Filter4Icon color="primary" />
                            </th>
                            <td>{userNames[3]}</td>
                            <td>{totalScores[3]}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                <Filter5Icon color="primary" />
                            </th>
                            <td>{userNames[4]}</td>
                            <td>{totalScores[4]}</td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
            </Paper>
        </>

    )
}
export default Leaderboard;