var fs = require('fs');
var _ = require('lodash')
var Mustache = require('mustache');
var dateFormat = require('dateformat');

function render(resumeObject) {

	_.each(resumeObject.work, function(w){
		w.startDateYear = dateFormat(w.startDate, "mm/yyyy");
		if(w.endDate) {
			w.endDateYear = dateFormat(w.endDate, "mm/yyyy");
		} else { 
			w.endDateYear = ''
		}
	});
	_.each(resumeObject.education, function(e){
    if( !e.area || !e.studyType ){
      e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
    }  else {
      e.educationDetail = e.area + ", "+ e.studyType;
    }
		e.startDateYear = dateFormat(e.startDate, "mm/yyyy");
		if(e.endDate) {
			e.endDateYear = dateFormat(e.endDate, "mm/yyyy");
		}  else { 
			e.endDateYear = ''
		}
	});

	resumeObject.profiles = {};
    resumeObject.currentDate = dateFormat(new Date(), "dd.mm.yyyy");

	_.each(resumeObject.basics.profiles, function(profile){
    	resumeObject.profiles[profile.network] = profile.username;
	});
	console.log(resumeObject.profiles);
	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);
	

	return resumeHTML;
};
module.exports = {
	render: render
}
