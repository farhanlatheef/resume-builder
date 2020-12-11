import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';


import {Button, Container, Row, Col} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../common/header';

import  {resumeActions} from '../actions';

import Education from '../common/education';
import Experience from '../common/experience';


const ItemRow = (props) => <Row><Col>{props.label}</Col>  <Col>{props.value}</Col> </Row>


export default function ViewResume(props) {

	const id = props.match.params.id;

 	const resume = useSelector(state => state.resume.item);
	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(resumeActions.getResumeAction(id));
    }, []);

	return (
		<div>
		<Header/>
			<Container style={{marginTop:'50px', width: '50%'}} className="border">
			<div style={{textAlign:'center', fontSize: '30px'}} className="botom-border">
			 Resume 

			 <Link to={`/upsert/${id}`} style={{marginLeft: '10px'}}>
			 <FontAwesomeIcon icon="edit" style={{color:'grey', fontSize: '15px'}}/>
			 </Link>
			 </div>
			{resume && (
				<div style={{marginTop: '20px'}}>
				<ItemRow label="Name:" value={resume.name} />
				<ItemRow label="Email:" value={resume.email} />
				<ItemRow label="Phone:" value={resume.phone} />
				<ItemRow label="Address:" value={resume.address} />
				<ItemRow label="skills:" value={resume.skills.map(a => a.text).join() } />

				<div style={{marginTop: '10px'}}>Education </div>
					{
						resume.educations.map((item,index)=> {
							return <Education key={index} item={item} />
						})
					}

				<div>Experience </div>
					{
						resume.experiences.map((item,index)=> {
							return <Experience key={index} item={item} />
						})
					}
				</div>

				)

			}
			</Container>
		</div>
	)

}