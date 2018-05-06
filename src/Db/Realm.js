import Reaml from 'react';

class Survey extends Realm.Object { };
Survey.schema = {
    name: 'Survey',
    primarykey: 'surveyId',
    properties: {
        surveyId: 'int',
        surveyName: 'string',
        target: 'float',
        inputType: { type: 'string', default: 'text' }
    }
}

class Plan extends Realm.Object { };
Plan.schema = {
    name: 'Plan',
    primarykey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        round: 'string',
        storeCode: 'string',
        surveys: { type: 'list', objectType: 'Survey' }
    }
};


export default new Realm({
    path: Realm.defaultPath,
    schema: [Plan, Survey],
    schemaVersion: 4
});
