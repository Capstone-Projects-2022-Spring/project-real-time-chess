import * as ReactDOM from 'react-dom';

export default class UINavigator {
    static render(element: JSX.Element) {
        const target = document.getElementById('react-app-target');
        ReactDOM.render(element, target);
    }
}
