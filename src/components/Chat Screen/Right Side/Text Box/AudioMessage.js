import { Modal } from 'react-bootstrap'
import React from 'react';
import { Button } from 'react-bootstrap';
import "./TextBox.css"

function MyVerticallyCenteredModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={()=>{
                        props.setStream({
                            access: false,
                            recorder: null,
                            error: ""});
                        props.setRecording({
                            active: false,
                            available: false,
                            url: ""
                        });}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Recording Audio
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className='align-items-center d-flex flex-row'>
                        <div className="d-flex" id="audio-container">
                            <button type="button" className="btn btn-light d-flex" onClick={() => { !props.recording.active && props.stream.recorder.start()}} style={{margin:"2px"}}>
                                <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                                    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                                </svg>
                            </button>
                            <button type="button" class="btn btn-light" onClick={() => props.stream.recorder.stop()} style={{margin:"2px"}}>
                                <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop" viewBox="0 0 16 16">
                                    <path d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z" />
                                </svg>
                            </button>
                            <br></br>
                            {props.recording.available && <audio controls src={props.recording.url} style={{margin:"2px"}}/>} <br></br>
                        </div>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={
                    (event)=>{
                        if(props.recording.available){
                        props.submitHandler(event, "audio", props.recording.url)
                        props.setStream({
                            access: false,
                            recorder: null,
                            error: ""});
                        props.setRecording({
                            active: false,
                            available: false,
                            url: ""
                        });
                        }
                        props.onHide();
                    }
                }>send</Button>
            </Modal.Footer>
        </Modal>
    );
}

function AudioMessage({ submitHandler }) {
    const [modalShow, setModalShow] = React.useState(false);

    const [stream, setStream] = React.useState({
        access: false,
        recorder: null,
        error: ""
    });

    const [recording, setRecording] = React.useState({
        active: false,
        available: false,
        url: ""
    });

    const chunks = React.useRef([]);


    function getAccess() {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((mic) => {

            let mediaRecorder;

            try {
                mediaRecorder = new MediaRecorder(mic, {
                    mimeType: "audio/webm"
                });
            } catch (err) {
                console.log(err);
            }

            const track = mediaRecorder.stream.getTracks()[0];
            track.onended = () => console.log("ended");

            mediaRecorder.onstart = function () {
                setRecording({
                    active: true,
                    available: false,
                    url: ""
                });
            };

            mediaRecorder.ondataavailable = function (e) {
                chunks.current.push(e.data);
            };

            mediaRecorder.onstop = async function () {
                const url = URL.createObjectURL(chunks.current[0]);
                chunks.current = [];

                setRecording({
                    active: false,
                    available: true,
                    url
                });
            };

            setStream({
                ...stream,
                access: true,
                recorder: mediaRecorder
            });
        })
            .catch((error) => {
                console.log(error);
                setStream({ ...stream, error });
            });
    }


    return (
        <>
            <Button variant="primary" className="butn btn btn-light" style={{ margin: "2px" }} onClick={() => {setModalShow(true); getAccess()}}>
                <svg id="i-microphone" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M16 2 C12 2 12 6 12 6 L12 16 C12 16 12 20 16 20 20 20 20 16 20 16 L20 6 C20 6 20 2 16 2 Z M8 17 C8 17 8 24 16 24 24 24 24 17 24 17 M13 29 L19 29 M16 24 L16 29" />
                </svg>
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                submitHandler={submitHandler}
                stream = {stream}
                setStream = {setStream}
                recording = {recording}
                setRecording = {setRecording}
                chunks = {chunks}
            />
        </>
    );
}

export default AudioMessage;