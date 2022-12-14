import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function AlbumNavigation(props) {

    return (
        <Navbar >
            <Container >
                <Navbar.Brand style={{color:"black", fontWeight:"bold", fontSize:"25px"  }} >{props.albumTitle}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button variant="secondary" className="d-lg-none" onClick={() => props.handleOffcanvasShow()} style={{ 'marginRight': '20px', fontWeight: "bold" }}>Change Album</Button>
                        {/* If album select button is hidden, then show below button */}
                        { /* <Button className="d-none d-lg-block" onClick={props.handleOffcanvasShow} style={{ 'marginRight': '20px', fontWeight: "bold" }}>New button</Button> */}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AlbumNavigation