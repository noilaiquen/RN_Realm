import realm from './Realm';

export const SurveyServices = {
    add: (data, planId) => new Promise((resolve, reject) => {
        try {
            let planSurvey = realm.objects('Plan').filtered(`id = ${planId}`)[0].surveys;
            realm.write(() => {
                planSurvey.push({
                    surveyId: data.surveyId,
                    surveyName: data.surveyName ? data.surveyName : 'undefined',
                    target: data.target ? data.target : 0,
                    inputType: data.inputType ? data.inputType : 'text'
                });
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    }),
    addAll: (plans) => new Promise((resolve, reject) => {
        try {
            plans.forEach((plan) => {
                PlanServices.add(plan);
            });
            resolve(plans);
        } catch (error) {
            reject(error);
        }
    }),
    get: (filters) => {
        let plans = realm.objects('Plan');
        // if (filters !== undefined || filters !== null || filters !== '') {
        //     return plans.filtered(filters);
        // }

        return Array.from(plans);
    },
    remove: (id) => new Promise((resolve, reject) => {
        try {
            let plan = realm.objects('Plan').filtered(`id = ${id}`);
            realm.write(() => {
                realm.delete(plan);
            });
            resolve();
        } catch (error) {
            reject(' ' + error);
        }
    })
}