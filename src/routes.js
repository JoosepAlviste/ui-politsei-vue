import Intro from './steps/Intro.vue';
import PersonData from './steps/PersonData.vue';
import EventInfo from './steps/EventInfo.vue';
import StolenProperties from './steps/StolenProperties.vue';
import Perpetrators from './steps/Perpetrators.vue';
import Witnesses from './steps/Witnesses.vue';
import ConfirmStep from './steps/ConfirmStep.vue';
import SubmittedStep from './steps/SubmittedStep.vue';

let routes = [
    {
        path: '/',
        component: Intro,
        name: 'intro',
        title: 'Alusta'
    },
    {
        path: '/person_data',
        component: PersonData,
        name: 'person_data',
        title: 'Isikuandmed'
    },
    {
        path: '/event_info',
        component: EventInfo,
        name: 'event_info',
        title: 'Toimunu info'
    },
    {
        path: '/stolen_properties',
        component: StolenProperties,
        name: 'stolen_properties',
        title: 'Varad',
    },
    {
        path: '/perpetrators',
        component: Perpetrators,
        name: 'perpetrators',
        title: 'Süüdistatavad'
    },
    {
        path: '/witnesses',
        component: Witnesses,
        name: 'witnesses',
        title: 'Tunnistajad'
    },
    {
        path: '/confirm_step',
        component: ConfirmStep,
        name: 'confirm_step',
        title: 'Kinnita'
    },
    {
        path: '/submitted_step',
        component: SubmittedStep,
        name: 'submitted_step',
        title: 'Valmis!'
    }
];

export default routes;
