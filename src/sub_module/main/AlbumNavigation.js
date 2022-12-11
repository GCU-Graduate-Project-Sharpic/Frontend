import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function AlbumNavigation(props) {

    return (
        <Navbar bg='light'>
            <Container>
                <Navbar.Brand>{props.albumTitle}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button className="d-lg-none" onClick={() => props.handleOffcanvasShow()} style={{ 'marginRight': '20px', fontWeight: "bold" }}>Album selects</Button>
                        {/* If album select button is hidden, then show below button */}
                        { /* <Button className="d-none d-lg-block" onClick={props.handleOffcanvasShow} style={{ 'marginRight': '20px', fontWeight: "bold" }}>New button</Button> */}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AlbumNavigation