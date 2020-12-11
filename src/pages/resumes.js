import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import {Button, Container, Row, Col} from 'reactstrap';

import Header from '../common/header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import  {resumeActions} from '../actions';


const Resume = (props)=> {
	return (
	<Row style={{padding:'5px'}}>
	<Col>
	<Link  to={`/view/${props.item.id}`}>
		<div  style={{color:'black'}}>{props.item.name}</div>
	</Link>
	</Col>

	<Col >
	<span className="float-right" >
		<Link  to={`/upsert/${props.item.id}`} style={{color:'grey'}} >
		<FontAwesomeIcon icon="edit" />
		</Link>
		<FontAwesomeIcon icon="trash"  style={{marginLeft:'10px', color:'grey'}} 
		className="clickable"
		onClick={()=>props.onDelete(props.item)}/>
		</span>
	</Col>

	</Row>
	)
}

export default function Resumes() {
	 const resumes = useSelector(state => state.resume.items);
	 const dispatch = useDispatch();

	useEffect(() => {
        dispatch(resumeActions.getResumesAction());
    }, []);

    const onDelete = (item)=> {
    	dispatch(resumeActions.deleteResumeAction(item.id));
    }

	return (
		<div>
			<Header/>
			<Container style={{marginTop:'50px'}}>
			<div className="border-bottom">
			Resumes
			<Link to="/upsert">
			<FontAwesomeIcon icon="plus-circle" color='grey' style={{marginLeft:'10px'}} className="clickable" />
			</Link>
			</div>

			{	resumes &&
				resumes.map((item,index)=> {
					return <Resume key={index} item={item} onDelete={onDelete}/>
				})
			}
			</Container>
		</div>
	)

}


