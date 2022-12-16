import React, { useState } from 'react';
import "./ImageModal.css";
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { ReactCompareSlider, ReactCompareSliderImage, styleFitContainer } from 'react-compare-slider';


function ImageModal(props) {
  const radios = [
    { name: 'None', value: '-1' },
    { name: 'SR', value: '0' },
    { name: 'Restoration - wo scratches', value: '1' },
    { name: 'Restoration - w scratches', value: '2' },
    { name: '2D SR', value: '3' }
  ]

  const [imageInfo, setImageInfo] = useState({ info: { status: false, up: -1 } });

  const [typeButton, setTypeButton] = useState('Select type');
 
  const [radioValue, setRadioValue] = useState('0');
  const [imgSlider, setImgSlider] = useState(true);
  const [_src, setSrc] = useState();
  const [_src2, setSrc2] = useState();

  React.useEffect(() => {
    axios.get(window.location.origin + "/api/image/info/" + props.imageId)
      .then((res) => {
        setImageInfo({
          id: props.imageId,
          info: res.data
        });
      })
  }, []);

  React.useEffect(() => {
    if (imageInfo.info.status) {
      setImgSlider(true);
      setSrc(window.location.origin + "/api/image/" + props.imageId);
      setSrc2(window.location.origin + "/api/image/processed/" + props.imageId + "?temp=" + Math.random().toString(36).substring(2, 12));
      setRadioValue(imageInfo.info.up);
    } else if (imageInfo.info.up !== -1) {
      setImgSlider(true);
      setSrc(window.location.origin + "/api/image/" + props.imageId);
      setSrc2('processing.png');
      setRadioValue(imageInfo.info.up);
      const interval = setInterval(() => {
        axios.get(window.location.origin + "/api/image/info/" + props.imageId)
          .then((res) => {
            setImageInfo({
              id: props.imageId,
              info: res.data
            });
          })
        clearInterval(interval);
      }, 3000)
    } else {
      setImgSlider(false);
      setSrc(window.location.origin + "/api/image/" + props.imageId);
      setSrc2('processing.png');
      setRadioValue(imageInfo.info.up);
    }
  }, [imageInfo]);


  return (

    <div
      className='modal show'
      style={{
        display: 'block',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {
        imgSlider ? (
          // true
          <Modal.Dialog
            onHide={props.openModal}
            size="xl"
            backdrop="static"
            keyboard={false}
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header >
              <Modal.Title  style={{fontWeight:"bold"}}>Image Comparison</Modal.Title>
            </Modal.Header>

            <Modal.Body id="modal_modified">

              <ReactCompareSlider className="processingImage"
                itemOne={<ReactCompareSliderImage src={_src} style={{}} alt="Image one" />}
                itemTwo={<ReactCompareSliderImage src={_src2} style={{}} alt="Image two" />}
              />

            </Modal.Body>

            <Modal.Footer>

              <DropdownButton title="Download" variant="dark">
                <Dropdown.Item href={_src} download>Original</Dropdown.Item>
                <Dropdown.Item href={_src2} download>Processed</Dropdown.Item>
              </DropdownButton> <br />

              <DropdownButton variant="secondary" title={typeButton} >
                {/* select upper radio */}
                {radios.map((radio) => (
                  <Dropdown.Item onClick={() => selectType(radio.value)}>{radio.name}</Dropdown.Item>
                ))}
              </DropdownButton> <br />


              {
                imageInfo.info.status ? (
                  <Button variant="secondary" onClick={() => setProcessing(imageInfo.id, radioValue)} style={{ width: "100px", border: "0" }}>Re-run</Button>
                ) : (
                  <Button disabled variant="light" style={{ width: "100px", border: "0" }}>Loading</Button>
                )
              }
              <br />
              <Button variant="danger" onClick={props.openModal} >X</Button>

            </Modal.Footer>
          </Modal.Dialog>


        ) : (
          // false

          <Modal.Dialog
            onHide={props.openModal}
            size="xl"
            backdrop="static"
            keyboard={false}
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header  >
              <Modal.Title style={{fontWeight:"bold"}}>Image Comparison</Modal.Title>
            </Modal.Header>

            <Modal.Body id="modal_modified">
              <Image fluid='true' src={_src} />
            </Modal.Body>

            <Modal.Footer>

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

              <br />



              <DropdownButton variant="dark" title={typeButton} >
                {/* select upper radio */}
                {radios.map((radio) => (
                  <Dropdown.Item onClick={() => selectType(radio.value)}>{radio.name}</Dropdown.Item>
                ))}
              </DropdownButton> <br />
              <Button variant="secondary" onClick={() => setProcessing(imageInfo.id, radioValue)} >Run</Button>
              <br />
              <Button variant="danger" onClick={props.openModal}>X</Button>


            </Modal.Footer>
          </Modal.Dialog>
        )
      }
    </div>
  )

  function setProcessing(imageId, radioValue) {
    console.log("radio value: ", radioValue);
    axios.patch(window.location.origin + "/api/image/up/" + imageId + "/" + radioValue)
      .catch((err) => {
        window.alert("Fail to send processing request");
      })
      .then((res) => {
        if (res.status == 200) {
          window.alert("Send processing request");
          return axios.get(window.location.origin + "/api/image/info/" + imageId)
        }
      })
      .then((res) => {
        setImageInfo({
          id: imageId,
          info: res.data
        });
        props.getImageInfos()
      })
  }

  function selectType(typeValue){
    const radio = radios.find((radio) => radio.value === typeValue)
    setTypeButton(radio.name);
    setRadioValue(radio.value);
  }

 
}

export default ImageModal