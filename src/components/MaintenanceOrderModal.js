import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function MaintenanceOrderModal( props ) {

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="customModal"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <p>Maintenance Order <br/>added!</p>
        <span className='newId'>{props.maintenanceId}</span>
      </Modal.Body>
    </Modal>
  );
}
