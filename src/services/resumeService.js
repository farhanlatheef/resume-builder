

export  {
    upsertResume,
    getResumes,
    getResume,
    deleteResume
};


function upsertResume(resume) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resume)
    };

    return fetch('/resume', requestOptions).then(handleResponse);
}


function getResumes() {
	const requestOptions = {
        method: 'GET',
    };
    return fetch('/resumes', requestOptions).then(handleResponse);
}

function getResume(id) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(`/resume/${id}`, requestOptions).then(handleResponse);
}


function deleteResume(id) {
    const requestOptions = {
        method: 'DELETE',
    };
    return fetch(`/resume/${id}`, requestOptions).then(handleResponse);
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

