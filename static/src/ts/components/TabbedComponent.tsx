import * as React from 'react';

export interface TabbedComponentProps {
    tabs: {
        label: string;
        element: JSX.Element;
    }[];
    activeTab?: number;
}

export default class TabbedComponent extends React.Component<TabbedComponentProps, {}> {
    constructor(props: TabbedComponentProps) {
        super(props);
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <div className="tabbed-component-button-group">
                    {this.props.tabs.map((tab) => {
                        return <button className="tabbed-component-button">{tab.label}</button>;
                    })}
                </div>

                <div>{this.props.tabs[this.props.activeTab ?? 0].element}</div>
            </div>
        );
    }
}
