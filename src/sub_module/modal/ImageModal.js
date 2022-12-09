import React, { useState } from 'react';

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

  return (

    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "1000", backgroundColor: "white", width: "90vw", height: "90vh", border: "1px solid black",alignItems: "center" , borderRadius: "10px", overflow: "auto" }}>
      {
        props.imgSlider ? (
          // true
          <Stack style={{ width: "100%", height: '100%', alignItems: "center" }}>

            <Row >
              <img src={props._src} style={{ width: "50vw", height: "28vw", margin: "50px", maxWidth: "80%", minWidth: "80%" }} />
            </Row>

            <Row>
              <ButtonGroup className="mb-2" style={{ zIndex: "1" }}>
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
            </Row>
            <Row>
              <ButtonGroup>
                <Button variant='danger' onClick={props.isProcessed} style={{ width: "100px", backgroundColor: "blue", borderBlockColor: "blue", border: "0" }}>Processing</Button>
                <Button variant='danger' onClick={props.openModal} style={{ width: "100px", border: "0" }}>Close</Button>
              </ButtonGroup>
            </Row>


          </Stack>
        ) : (
          // false
          <Stack style={{ width: "100%", height: "100%", alignItems: "center" }}>

            <Row>

              <ReactCompareSlider style={{ width: "50vw", height: "28vw", margin: "50px", maxWidth:"80%", minWidth: "80%"}}
                itemOne={<ReactCompareSliderImage src={props._src} alt="Image one" />}
                itemTwo={<ReactCompareSliderImage src={props._src} style={{ filter: 'grayscale(1)' }} alt="Image two" />}
              />
            </Row>

            <Row>

            </Row>
            <Row>
              <ButtonGroup>
                <Button variant='danger' onClick={props.isProcessed} style={{ width: "100px", backgroundColor: "blue", borderBlockColor: "blue", border: "0" }}>Processing</Button>
                <DropdownButton title="Download" variant="success">
                  <Dropdown.Item href={props._src.toString().trim()} download>Original</Dropdown.Item>
                  <Dropdown.Item href={props._src.toString().trim()} download>Processed</Dropdown.Item>
                </DropdownButton>
                <Button variant='danger' onClick={props.openModal} style={{ width: "100px", border: "0" }}>Close</Button>
              </ButtonGroup>
            </Row>


          </Stack>
        )
      }
    </div>
  )
}

export default ImageModal