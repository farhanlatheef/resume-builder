import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';



import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';

import { WithContext as ReactTags } from 'react-tag-input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../common/header';
import AddEducation from '../common/addEducation';
import AddExperience from '../common/addExperience';


import Education from '../common/education';
import Experience from '../common/experience';


import  {resumeActions} from '../actions';


import  '../css/react-tag.css'


const SKILL_SUGGESTIONS = [
    { id: 'php', text: 'PHP' },
    { id: 'java', text: 'Java' },
    { id: 'javascript', text: 'JavaScript' },
    { id: 'python', text: 'Python' },
    { id: 'swift', text: 'Swift' },
    { id: 'go', text: 'Go' },
    { id: 'ruby', text: 'Ruby' },
 ]

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const ISTATE = {
    name: '',
    email: '',
    phone: '',
    address: '',
    educations : [],
    experiences : [],
    skills : []
}

// const ISTATE = {
//     name: 'farhan',
//     email: 'farhan@mail.com',
//     phone: '9876543211',
//     address: 'some address',
//     educations : [],
//     experiences : [],
//     skills : []
// }

export default function UpsertMain(props) {
  const id = props.match.params.id;

  const resume =  useSelector(state => state.resume.item );
  const dispatch = useDispatch();

  useEffect(() => {
       if(id) dispatch(resumeActions.getResumeAction(id));
  }, []);

  // if create new
  if(!id) return <UpsertResume {...props}  resume={ISTATE} />

  // if update wait till the resume is loaded
  return (
    <div>
    { resume &&  <UpsertResume {...props}  resume={resume} /> }
    </div>
  )
}


function UpsertResume(props) {
  const dispatch = useDispatch();

	const [showEdu, setShowEdu] = useState(false);
	const [showExp, setShowExp] = useState(false);
  const [error, setError] = useState(null);

  

	const [inputs, setInputs] = useState(props.resume);
 
    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

	const handleSkillDelete = (i) => {
		setInputs(inputs => ({
		 ...inputs, 
		 skills: inputs.skills.filter((skill, index) => index !== i) 
		}));
	}

	const handleSkillAdd = (skill) => {
		setInputs(inputs => ({
		 ...inputs, 
		 skills: [...inputs.skills, skill]  
		}));
	}

	const handleSkillDrag = (skill, currPos, newPos) => {
		const skills = [...inputs.skills];
        const newSkills = skills.slice();
        newSkills.splice(currPos, 1);
        newSkills.splice(newPos, 0, skill);
        setInputs(inputs => ({
		 ...inputs, 
		 skills: newSkills
		}));
	}

	const eduAdd = (edu) => {
		setInputs(inputs => ({
		 ...inputs, 
		 educations: [...inputs.educations, edu]  
		}));
		setShowEdu(false);
	}

	const onEduDelete = (i) => {
		setInputs(inputs => ({
		 ...inputs, 
		 educations: inputs.educations.filter((edu, index) => index !== i) 
		}));
	}

	const expAdd = (exp) => {
		setInputs(inputs => ({
		 ...inputs, 
		 experiences: [...inputs.experiences, exp]  
		}));
		setShowExp(false);
	}

	const onExpDelete = (i) => {
		setInputs(inputs => ({
		 ...inputs, 
		 experiences: inputs.experiences.filter((edu, index) => index !== i) 
		}));
	}

  const validate = () => {
    if(!inputs.name.length) return setError('Name can\'t be empty');
    if(!inputs.email.length) return setError('Email can\'t be empty');
    if(inputs.phone.length != 10) return setError('Phone should be 10 digits');
    if(!inputs.address.length) return setError('Address  can\'t be empty');
    if(!inputs.educations) return setError('Please add atleast 1 education qualification');
    if(!inputs.skills) return setError('Please add atleast 1 skill set');
    setError(null);
  }

	const onSave = () => {
    validate();
    if(error) return;
    dispatch(resumeActions.upsertResumeAction(inputs, props.history));

	}


	return (
	<div>
	<AddEducation open={showEdu} onClose={()=>setShowEdu(false)} onAdd={eduAdd}/>
	<AddExperience open={showExp} onClose={()=>setShowExp(false)} onAdd={expAdd} />
	<Header/>
	<Container style={{marginTop:'50px'}}>

    <Form>
      <FormGroup>
        <Label for="nameField">Name</Label>
        <Input type="text" name="name" id="nameField" value={inputs.name}  onChange={handleChange}  placeholder="eg: Jacob" />
      </FormGroup>

      <FormGroup>
        <Label for="emailField">Email</Label>
        <Input type="email" name="email" id="emailField" value={inputs.email} onChange={handleChange}  placeholder="eg: jacob@example.com" />
      </FormGroup>

      <FormGroup>
        <Label for="phoneField">Phone</Label>
        <Input type="text" name="phone" id="phoneField"  value={inputs.phone}  onChange={handleChange} placeholder="eg: 9876543XX" />
      </FormGroup>

      <FormGroup>
        <Label for="addressField">Address</Label>
        <Input type="textarea" name="address" id="addressField"  value={inputs.address} onChange={handleChange} />
      </FormGroup>

       <FormGroup>
        <Label for="education" >
        Education 
        <FontAwesomeIcon icon="plus-circle" color='grey' style={{marginLeft:'10px'}} className="clickable"
        onClick={()=>setShowEdu(true)}/>
        </Label>
        {
        	inputs.educations.map((item,index)=> {
        		return <Education key={index} index={index} item={item} onEduDelete={onEduDelete} />
        	})
        }
        </FormGroup>

        <FormGroup>
        <Label for="experience" >
        Experience 
        <FontAwesomeIcon icon="plus-circle" color='grey' style={{marginLeft:'10px'}} className="clickable"
        onClick={()=>setShowExp(true)}/>
        {
        	inputs.experiences.map((item,index)=> {
        		return <Experience key={index} index={index} item={item} onExpDelete={onExpDelete} />
        	})
        }


        </Label>
       </FormGroup>

       <FormGroup>
        <Label for="skills">Skills</Label>
	      <ReactTags 
	      placeholder="Add new skill"
	      tags={inputs.skills}
	      suggestions={SKILL_SUGGESTIONS}
	      handleDelete={handleSkillDelete}
	      handleAddition={handleSkillAdd}
	      handleDrag={handleSkillDrag}
	      delimiters={delimiters} />
        </FormGroup>

        {error ? <div style={{color:'red'}}>{error}</div> : null }
      
     
      <Button color="primary" style={{marginTop: '20px', marginBottom: '20px'}}
      onClick={onSave}>Save</Button>
    </Form>
    </Container>
    </div>
  );

}



