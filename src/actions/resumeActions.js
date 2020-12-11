import {upsertResume, getResumes, getResume, deleteResume} from '../services/resumeService';
import {alertActions} from './';

import { resumeConstants } from '../constants/resumeConstants';

export const resumeActions = {
    upsertResumeAction,
    getResumesAction,
    getResumeAction,
    deleteResumeAction
};



function upsertResumeAction(resume, history) {
	return dispatch => {
        dispatch(request(resume));

        upsertResume(resume)
            .then(
                resp => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success(resume.id ?'Sucessfuly updated resume' : 'Sucessfuly added resume'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(resume) { return { type: resumeConstants.UPSERT_REQUEST, resume } }
    function success(resume) { return { type: resumeConstants.UPSERT_SUCCESS, resume } }
    function failure(error) { return { type: resumeConstants.UPSERT_FAILURE, error } }

}


function getResumesAction() {
    return dispatch => {
        dispatch(request());

        getResumes()
            .then(
                resumes => dispatch(success(resumes)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: resumeConstants.GET_RESUMES_REQUEST } }
    function success(resumes) { return { type: resumeConstants.GET_RESUMES_SUCCESS, resumes } }
    function failure(error) { return { type: resumeConstants.GET_RESUMES_FAILURE, error } }

}

function getResumeAction(id) {
    return dispatch => {
        dispatch(request(id));

        getResume(id)
            .then(
                resume => dispatch(success(resume)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: resumeConstants.GET_RESUME_REQUEST, id } }
    function success(resume) { return { type: resumeConstants.GET_RESUME_SUCCESS, resume } }
    function failure(error) { return { type: resumeConstants.GET_RESUME_FAILURE, error } }

}

function deleteResumeAction(id) {
    return dispatch => {
        dispatch(request(id));

        deleteResume(id)
            .then(
                resume => {
                    dispatch(success(id))
                    dispatch(alertActions.success('Sucessfuly deleted resume'));
               
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.success('Failed to delete resume'));
                }
            );
    };

    function request(id) { return { type: resumeConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: resumeConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: resumeConstants.DELETE_FAILURE, error } }

}





