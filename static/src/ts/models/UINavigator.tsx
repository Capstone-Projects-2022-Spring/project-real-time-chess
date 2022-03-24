import * as ReactDOM from 'react-dom';

/**
 * The UI Navigator utility for changing views in the react app.
 */
class UINavigator {
    /**
     * Renders the given page view.
     *
     * @param element - The element to render as a page view.
     */
    static render(element: JSX.Element) {
        const target = document.getElementById('react-app-target');
        ReactDOM.render(element, target);
    }
}

export default UINavigator;
