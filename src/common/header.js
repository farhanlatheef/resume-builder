import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {Row, Col} from 'reactstrap';


export default function Header() {
	// const alert = {message :'message', type:'alert-success'};
	const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();


	return (
		<Row style={styles.bar}>
		<Col md={8}>
			<Link to="/" style={styles.appTitle}>
			<FontAwesomeIcon icon="address-card" color='grey' style={{marginLeft:'10px'}}/>
			<span style={{marginLeft:'10px'}}> Resume Builder </span>
			</Link>
		</Col>

		<Col>
			{alert.message &&
                        <div style={styles.cAlert} className={` alert ${alert.type}`}>{alert.message}</div>
                    }
        </Col>
		</Row>
	)

}


const styles = {
	bar : {
		borderColor : 'lightgrey',
		padding : '10px',
		borderBottomWidth : '1px',
		borderBottomStyle: 'solid',
		fontSize : '20px'
	},
	appTitle : {
		color:'black',
		textDecoration : 'none'
	},
	cAlert : {
		fontSize : '12px',
		textAlign : 'center',
		padding : '5px'
	}
}