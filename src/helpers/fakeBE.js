// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

const UUID = function () { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
    
export function configureFakeBE() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/resume') && method === 'POST':
                        return upsertResume();
                    case url.endsWith('/resumes') && method === 'GET':
                        return getResumes();
                    case url.startsWith('/resume/') && method === 'GET':
                        return getResume();
                    case url.startsWith('/resume/') && method === 'DELETE':
                        return deleteResume();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

           function resumesFromDB() {
             return (JSON.parse(localStorage.getItem('resumes')) || []);
           }

            function upsertResume() {
                var resume = body;
                console.log('upsertResume', resume);

                var resumes = resumesFromDB();

                if(resume.id)resumes = resumes.filter(x => x.id !== resume.id);
                else resume.id = UUID();

                resumes.push(resume);
                localStorage.setItem('resumes', JSON.stringify(resumes));
                return ok();
            }

            function getResumes() {
               return ok(resumesFromDB());
            }

            function getResume() {
                var resumes = resumesFromDB();
                const id = uuidFromUrl();
                const resume =  resumes.find(x => x.id === id);
                if(resume) return ok(resume);
                return error(`No such resume exist`);
            }


            function deleteResume() {
                var resumes = resumesFromDB();
                resumes = resumes.filter(x => x.id !== uuidFromUrl());
                localStorage.setItem('resumes', JSON.stringify(resumes));
                return ok();
            }

            

    
            function getUsers() {
                if (!isLoggedIn()) return unauthorized();

                return ok(users);
            }
    
            function deleteUser() {
                if (!isLoggedIn()) return unauthorized();
    
                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function isLoggedIn() {
                return headers['Authorization'] === 'Bearer fake-jwt-token';
            }
    
            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function uuidFromUrl() {
                const urlParts = url.split('/');
                return urlParts[urlParts.length - 1];
            }
        });
    }
}