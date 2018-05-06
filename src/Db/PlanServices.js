import realm from './Realm';

export const PlanServices = {
    add: (data) => new Promise((resolve, reject) => {
        try {
            realm.write(() => {
                realm.create('Plan', {
                    id: Number(data.id),
                    name: data.name ? data.name : 'undefined',
                    round: data.round ? data.round : 'undefined',
                    storeCode: data.storeCode ? data.storeCode : 'undefined',
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
        console.log('--------------------', Array.from(plans));
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