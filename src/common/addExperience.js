import React, {useState} from 'react';


import {Modal, ModalHeader, ModalBody, ModalFooter,
Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';

const ISTATE = {
    title: '',
    company: '',
    fromYear: '',
    toYear: '',
}

// const ISTATE = {
//     title: 'Lead Developer',
//     company: 'Electrify Technolgies',
//     fromYear: '2015',
//     toYear: '2018',
// }


export default function AddExperience(props) {
	const [inputs, setInputs] = useState(ISTATE);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

	const edu  = {};

	return (
		<Modal isOpen={props.open} toggle={props.onClose} centered={true}>
		 <ModalHeader toggle={props.onClose}>Add Experience</ModalHeader>
		 <ModalBody>

		 <Form>
	      <FormGroup>
	        <Label for="titleField">Title</Label>
	        <Input type="text" name="title" id="titleField" value={inputs.title}  onChange={handleChange} placeholder="eg: Bachelor of science" />
	      </FormGroup>

	      <FormGroup>
	        <Label for="companyField">Company</Label>
	        <Input type="text" name="company" id="companyField"  value={inputs.company} onChange={handleChange}   placeholder="eg: School of Engineering" />
	      </FormGroup>
	     

	     <Row>
	     <Col>
	     	<FormGroup>
	        <Label for="fromYear">From year</Label>
	        <Input type="text" name="fromYear" id="to"  value={inputs.fromYear} onChange={handleChange} placeholder="eg: 2012" />
	      </FormGroup>
	     </Col>
	     <Col>
	     	<FormGroup>
	        <Label for="toYear">To year</Label>
	        <Input type="text" name="toYear" id="to"  value={inputs.toYear} onChange={handleChange} placeholder="eg: 2015" />
	      </FormGroup>
	     </Col>
	     </Row>
	     </Form>

        </ModalBody>
          <ModalFooter>
          <Button color="secondary" onClick={props.onClose}  >Cancel</Button>
          	<Button color="primary"  onClick={()=>props.onAdd(inputs)}  > Add  </Button>
          </ModalFooter>

		 </Modal>
	)
}