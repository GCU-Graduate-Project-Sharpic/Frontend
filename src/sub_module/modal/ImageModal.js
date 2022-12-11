import React, { useState } from 'react';
import "./ImageModal.css";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';


function ImageModal(props) {

  const radios = [
    { name: 'Default', value: '-1' },
    { name: 'SR', value: '0' },
    { name: 'Restoration - wo scratches', value: '1' },
    { name: 'Restoration - w scratches', value: '2' },
    { name: 'VSR', value: '3' }
  ]
  const [radioValue, setRadioValue] = useState('0');
  const [imgSlider, setimgSlider] = useState(true);
  const [_src, setSrc] = useState();
  const [_src2, setSrc2] = useState();

  React.useEffect(() => {
    if (props.image.info.status) {
      setimgSlider(true);
      setSrc(window.location.origin + "/api/image/" + props.image.id);
      setSrc2(window.location.origin + "/api/image/processed/" + props.image.id);
      setRadioValue(props.image.info.up);
    } else if (props.image.info.up !== -1) {
      setimgSlider(true);
      setSrc(window.location.origin + "/api/image/" + props.image.id);
      setSrc2('processing.png');
      setRadioValue(props.image.info.up);
    } else {
      setimgSlider(false);
      setSrc(window.location.origin + "/api/image/" + props.image.id);
      setSrc2('processing.png');
      setRadioValue(props.image.info.up);
    }
  }, [])

  return (

    <div className="ImageModal">
      {
        imgSlider ? (
          // true
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Row>
              {/* if image's width > height, then maxWidth = minWidth = 80%
                  else, maxWidth = minWidth = 30%
              */}
              <ReactCompareSlider className="processingImage"
                itemOne={<ReactCompareSliderImage src={_src} style={{}} alt="Image one" />}
                itemTwo={<ReactCompareSliderImage src={_src2} style={{}} alt="Image two" />}
              />
            </Row>
            <Row>
              <ButtonGroup>
                <Button variant='danger' onClick={() => props.setProcessing(props.image.id, radioValue)} style={{ width: "100px", backgroundColor: "blue", borderBlockColor: "blue", border: "0" }}>Processing</Button>
                <DropdownButton title="Download" variant="success">
                  <Dropdown.Item href={_src} download>Original</Dropdown.Item>
                  <Dropdown.Item href={_src2} download>Processed</Dropdown.Item>
                </DropdownButton>
                <Button variant='danger' onClick={props.openModal} style={{ width: "100px", border: "0" }}>Close</Button>
              </ButtonGroup>
            </Row>
          </Stack>
        ) : (
          // false
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Row>
              {/* width = props._src.width / 2 */}

              <img id='defaultImage' src={_src} />
            </Row>
            <Row>
              <ButtonGroup className="mb-2" style={{ zIndex: "1", display: 'none' }}>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>

              
              <ButtonGroup className="defaultButton">
              <DropdownButton id='dropDown' title="Select Image" >
                {/* select upper radio */}
                <Dropdown.Item onClick={() => setRadioValue('-1')}>Default</Dropdown.Item>
                <Dropdown.Item onClick={() => setRadioValue('0')}>SR</Dropdown.Item>
                <Dropdown.Item onClick={() => setRadioValue('1')}>Restoration - wo scratches</Dropdown.Item>
                <Dropdown.Item onClick={() => setRadioValue('2')}>Restoration - w scratches</Dropdown.Item>
                <Dropdown.Item onClick={() => setRadioValue('3')}>VSR</Dropdown.Item>
              </DropdownButton>
                <Button variant='danger' onClick={() => props.setProcessing(props.image.id, radioValue)} style={{ backgroundColor: "blue", borderBlockColor: "blue" }}>Processing</Button>
                <Button variant='danger' onClick={props.openModal}>Close</Button>
              </ButtonGroup>
            </Row>
          </Stack>
        )
      }
    </div>
  )
}

export default ImageModal