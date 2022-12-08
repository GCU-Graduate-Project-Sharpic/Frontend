import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function AlbumNavigation(props) {

    return (
        <Navbar bg='light'>
            <Container>
                <Navbar.Brand href="#home">{props.album_name}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button className="d-lg-none" onClick={props.handleShow} style={{ 'marginRight': '20px', fontWeight: "bold" }}>Album selects</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AlbumNavigation