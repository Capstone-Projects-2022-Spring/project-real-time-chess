import * as React from 'react';

export interface TabbedComponentProps {
    tabs: {
        label: string;
        element: JSX.Element;
    }[];
}

export default class TabbedComponent extends React.Component<TabbedComponentProps, {}> {
    constructor(props: TabbedComponentProps) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.tabs.map((tab) => {
                    return <button>{tab.label}</button>;
                })}
            </div>
        );
    }
}
