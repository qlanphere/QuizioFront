import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { useGameContext } from '../../contexts/gameContext'
import { useAuthContext } from '../../contexts/auth'
import QuizIcon from '@mui/icons-material/Quiz';
const NavigationBar = () => {
    const {currentUser, logout} = useAuthContext()
    console.log(currentUser)
    return (
            <Navbar bg="primary" variant="dark">
                <Container>
                    <div style={{textAlign:'left'}}>
                        <Navbar.Brand href="/">
                            <QuizIcon/>
                        </Navbar.Brand>
                        <Navbar.Brand href="/">
                            Quizio
                        </Navbar.Brand>
                    </div>
                    <Nav >
                        <Nav.Link href="/">Home</Nav.Link>
                        {!currentUser && <Nav.Link href="/register">Register</Nav.Link>}
                        {!currentUser && <Nav.Link href="/login">Login</Nav.Link>}
                        {currentUser && <Nav.Link href = "/room" >Join</Nav.Link>}
                        {currentUser && <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>} 
                    </Nav>
                </Container>
            </Navbar>
    )
}

export default NavigationBar
