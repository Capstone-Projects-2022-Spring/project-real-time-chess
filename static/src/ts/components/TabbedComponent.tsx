import * as React from 'react';

interface TabbedComponentProps {
    tabs: {
        label: string;
        element: JSX.Element;
    }[];
    activeTab?: number;
    className?: string;
}

interface TabbedComponentState {
    activeTab: number;
}

class TabbedComponent extends React.Component<TabbedComponentProps, TabbedComponentState> {
    constructor(props: TabbedComponentProps) {
        super(props);
        this.state = {
            activeTab: props.activeTab ?? 0,
        };
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }} className={this.props.className}>
                <div className="tabbed-component-button-group">
                    {this.props.tabs.map((tab, i) => (
                        <button
                            className="tabbed-component-button"
                            onClick={() => {
                                this.setState({ activeTab: i });
                            }}
                            key={i}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div>{this.props.tabs[this.state.activeTab ?? 0]?.element}</div>
            </div>
        );
    }
}

export default TabbedComponent;
export { TabbedComponentProps, TabbedComponentState };
