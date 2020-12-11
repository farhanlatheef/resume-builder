import { resumeConstants } from '../constants';

export function resume(state = {}, action) {
    switch (action.type) {
        case resumeConstants.UPSERT_REQUEST:
            return { upserting: true, resume: action.resume };
        case resumeConstants.UPSERT_SUCCESS:
            return {};
        case resumeConstants.UPSERT_FAILURE:
            return {};

        case resumeConstants.GET_RESUMES_REQUEST:
            return {
                loading: true
            };
        case resumeConstants.GET_RESUMES_SUCCESS:
            return {
                items: action.resumes
            };
        case resumeConstants.GET_RESUMES_FAILURE:
            return {
                error: action.error
            };


        case resumeConstants.GET_RESUME_REQUEST:
            return {
                loading: true, id : action.id
            };
        case resumeConstants.GET_RESUME_SUCCESS:
            return {
                item: action.resume
            };
        case resumeConstants.GET_RESUME_FAILURE:
            return {
                error: action.error
            };


        case resumeConstants.DELETE_REQUEST:
            // add 'deleting:true' property to resume being deleted
            return {
                ...state,
                items: state.items.map(resume =>
                    resume.id === action.id
                        ? { ...resume, deleting: true }
                        : resume
                )
            };
        case resumeConstants.DELETE_SUCCESS:
            // remove deleted resume from state
            return {
                items: state.items.filter(resume => resume.id !== action.id)
            };
        case resumeConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to resume 
            return {
                ...state,
                items: state.items.map(resume => {
                    if (resume.id === action.id) {
                        // make copy of resume without 'deleting:true' property
                        const { deleting, ...resumeCopy } = resume;
                        // return copy of resume with 'deleteError:[error]' property
                        return { ...resumeCopy, deleteError: action.error };
                    }

                    return resume;
                })
            };
        default:
            return state
    }
}




