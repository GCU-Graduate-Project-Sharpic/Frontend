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
  const [radioValue, setRadioValue] = useState('-1');

  return (

    <div className="ImageModal">
      {
        props.imgSlider ? (
          // true
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Row>
              {/* width = props._src.width / 2 */}

              <img id='defaultImage' src={props._src} />
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

              <DropdownButton id='dropDown' title="Select Image" >
                {/* select upper radio */}
                <Dropdown.Item onClick={() => setRadioValue('-1')}>Default</Dropdown.Item>
                <Dropdown.Item onClick={() => setRadioValue('0')}>SR</Dropdown.Item>
                <Dropdown.Item onClick={() => setRadioValue('1')}>Restoration - wo scratches</Dropdown.Item>
                <Dropdown.Item onClick={() => setRadioValue('2')}>Restoration - w scratches</Dropdown.Item>
                <Dropdown.Item onClick={() => setRadioValue('3')}>VSR</Dropdown.Item>

              </DropdownButton>


              <ButtonGroup className="defaultButton">
                <Button variant='danger' onClick={props.isProcessed} style={{ backgroundColor: "blue", borderBlockColor: "blue"}}>Processing</Button>
                <Button variant='danger' onClick={props.openModal}>Close</Button>
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

              {/* if image's width > height, then maxWidth = minWidth = 80%
                  else, maxWidth = minWidth = 30%
              */}

              <ReactCompareSlider className="processingImage" 
                itemOne={<ReactCompareSliderImage src={props._src} style={{}} alt="Image one" />}
                itemTwo={<ReactCompareSliderImage src={props._src} style={{ filter: 'grayscale(1)' }} alt="Image two" />}
              />
            </Row>

            <Row>
              <DropdownButton title="Download" variant="success" style={{ marginBottom: '10px' }}>
                <Dropdown.Item href={props._src.toString().trim()} download>Original</Dropdown.Item>
                <Dropdown.Item href={props._src.toString().trim()} download>Processed</Dropdown.Item>
              </DropdownButton>
            </Row>
            <Row>
              <ButtonGroup>
                <Button variant='danger' onClick={props.isProcessed} style={{ backgroundColor: "blue", borderBlockColor: "blue", border: "0"}}>Processing</Button>
                <Button variant='danger' onClick={props.openModal} style={{ border: "0"}}>Close</Button>
              </ButtonGroup>
            </Row>


          </Stack>
        )
      }
    </div>
  )
}

export default ImageModal