import React, { useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
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
    <div>
      {
        props.imgSlider ? (
          // true
          <Stack style={{ width: "100%", height: "100%", alignItems: "center", textAlign: "center", margin: "50px" }}>

            <Row >
              <img src={props._src} alt="" width="300" height="200" style={{ width: "600px", height: "600px", marginBottom: "100px" }} />
              {/* <ReactCompareSlider  style={{width:"30vw", height:"30vw", marginBottom:"80px", alignItems:"center", textAlign:"center"}}
                                        itemOne={<ReactCompareSliderImage  src={_src}  alt="Image one" />}
                                        itemTwo={<ReactCompareSliderImage style={{ filter: "grayscale(1)" }} src={_src}  alt="Image two" />}
                                      /> */}


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
          <Stack style={{ width: "100%", height: "100%", alignItems: "center", textAlign: "center", margin: "50px" }}>

            <Row >

              <ReactCompareSlider style={{ width: "30vw", height: "30vw", marginBottom: "80px", alignItems: "center", textAlign: "center" }}
                itemOne={<ReactCompareSliderImage src={props._src} alt="Image one" />}
                itemTwo={<ReactCompareSliderImage style={{ filter: "grayscale(1)" }} src={props._src} alt="Image two" />}
              />


            </Row>

            <Row>

            </Row>
            <Row>
              <ButtonGroup>
                <Button variant='danger' onClick={props.isProcessed} style={{ width: "100px", backgroundColor: "blue", borderBlockColor: "blue", border: "0" }}>Processing</Button>
                <Button variant='danger' onClick={props.openModal} style={{ width: "100px", backgroundColor: "purple", borderBlockColor: "blue", border: "0" }}>Download</Button>

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