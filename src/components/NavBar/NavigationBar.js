import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { useGameContext } from '../../contexts/gameContext'
import { useAuthContext } from '../../contexts/auth'
const NavigationBar = () => {
    const {currentUser, logout} = useAuthContext()
    console.log(currentUser)
    return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        {/* <img src={} width="" height=""/> */}
                    </Navbar.Brand>
                    <Navbar.Brand href="/">
                        Quizio
                    </Navbar.Brand>
                    <Nav >
                        <Nav.Link href="/">Home</Nav.Link>
                        {!currentUser && <Nav.Link href="/register">Register</Nav.Link>}
                        {!currentUser && <Nav.Link href="/login">Login</Nav.Link>}
                        {currentUser && <Nav.Link href="/home" onClick={logout}>Logout</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
    )
}

export default NavigationBar
