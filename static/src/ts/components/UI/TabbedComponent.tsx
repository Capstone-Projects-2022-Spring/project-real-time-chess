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

/**
 * The TabbedComponent is a component that allows you to have multiple tabs and provides
 * a button group to switch between them.
 */
class TabbedComponent extends React.Component<TabbedComponentProps, TabbedComponentState> {
    /**
     * Creates an instance of TabbedComponent.
     * @param props - Properties for the tabbed component. This includes
     * the actual tabs to be displayed, the active tab (defaults to the 0th tab) and an
     * optional className which is applied to the outermost div.
     */
    constructor(props: TabbedComponentProps) {
        super(props);
        this.state = {
            activeTab: props.activeTab ?? 0,
        };
    }

    /**
     * @returns The react element for the TabbedComponent view.
     */
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
