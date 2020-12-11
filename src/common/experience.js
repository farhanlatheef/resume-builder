import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Experience(props) {

	return (
		<div style={styles.eduExpItem} >
			<div>
			{props.item.title}
			{ props.onExpDelete ?
			<FontAwesomeIcon icon="times" className="clickable" style={{marginLeft : '50px'}}
			 onClick={()=>props.onExpDelete(props.index)}/> : null }
			</div>
			<div>{props.item.company}</div>
			<div>{props.item.fromYear } - {props.item.toYear}</div>
		</div>
	)

}



const styles = {
	eduExpItem : {
		fontStyle: 'italic',
    	color: 'gray',
    	fontSize: '14px',
    	marginBottom : '10px'
	}
}