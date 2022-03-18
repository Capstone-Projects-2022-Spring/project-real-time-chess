import axios from 'axios';
import React from 'react';
import TextFieldComponent from '../components/TextFieldComponent';
import { NoProps } from '../models/types';

interface WinstonViewerState {
    logs: { level: string; message: string }[];
    filter: string;
}

class WinstonViewer extends React.Component<NoProps, WinstonViewerState> {
    private logListenerInterval?: number;

    constructor(props: NoProps) {
        super(props);
        this.state = {
            logs: [],
            filter: '@exclude "GET /logs"',
        };
    }

    parseFilters() {
        const filters = {
            includes: [] as string[],
            excludes: [] as string[],
            levels: [] as string[],
            last: 0,
        };

        function addFilter(tagname: string, value: string) {
            switch (tagname) {
                case 'include':
                    filters.includes.push(value);
                    break;
                case 'exclude':
                    filters.excludes.push(value);
                    break;
                case 'level':
                    filters.levels.push(value);
                    break;
                case 'last':
                    filters.last = parseInt(value, 10);
                    break;
                default:
            }
        }

        let inTag = false;
        let inValue = false;
        let inQuote = false;
        let quoteType = '';
        let tagname = '';
        let value = '';

        for (let i = 0; i < this.state.filter.length; i++) {
            if (!inTag && !inValue) {
                if (this.state.filter[i] === '@') {
                    inTag = true;
                }
            } else if (inTag) {
                if (this.state.filter[i] === ' ') {
                    inTag = false;
                    inValue = true;
                } else {
                    tagname += this.state.filter[i];
                }
            } else if (inValue) {
                if (inQuote) {
                    if (this.state.filter[i] === quoteType) {
                        inQuote = false;
                        inValue = false;
                        addFilter(tagname, value);
                        tagname = '';
                        value = '';
                    } else {
                        value += this.state.filter[i];
                    }
                } else if (this.state.filter[i] === '"' || this.state.filter[i] === "'") {
                    inQuote = true;
                    quoteType = this.state.filter[i]!;
                } else if (this.state.filter[i] === ' ') {
                    inValue = false;
                    addFilter(tagname, value);
                    tagname = '';
                    value = '';
                } else {
                    value += this.state.filter[i];
                }
            }
        }

        if (inValue) {
            addFilter(tagname, value);
        }

        return filters;
    }

    render() {
        const filters = this.parseFilters();

        let logsToDisplay = Array.from(this.state.logs);

        if (filters.includes.length > 0) {
            logsToDisplay = logsToDisplay.filter(log => {
                if (
                    filters.includes.find(
                        include => typeof log.message === 'string' && log.message.includes(include),
                    )
                ) {
                    return true;
                }
                return false;
            });
        }

        if (filters.excludes.length > 0) {
            logsToDisplay = logsToDisplay.filter(log => {
                if (filters.excludes.find(exclude => log.message.includes(exclude))) return false;
                return true;
            });
        }

        if (filters.levels.length > 0) {
            logsToDisplay = logsToDisplay.filter(log => {
                if (filters.levels.find(level => level === log.level)) return true;
                return false;
            });
        }

        if (filters.last !== 0) {
            logsToDisplay.splice(0, logsToDisplay.length - filters.last);
        }

        return (
            <div style={{ padding: '1rem' }}>
                <div style={{ position: 'sticky', top: 0, padding: '0.5rem' }}>
                    <TextFieldComponent
                        label="Filters"
                        value={this.state.filter}
                        onChange={e => this.setState({ filter: e.target.value.trim() })}
                    />
                </div>
                {logsToDisplay.map((log, key) => this.logItem(log.level, log.message, key))}
            </div>
        );
    }

    componentWillUnmount() {
        if (this.logListenerInterval) clearInterval(this.logListenerInterval);
    }

    componentDidMount() {
        this.updateLogs();
        this.listenForLogs();
    }

    updateLogs() {
        axios.get('/logs').then(response => {
            let logs = response.data;
            logs = `[${logs
                .split('\n')
                .filter((o: string) => {
                    try {
                        JSON.parse(o);
                        return true;
                    } catch (e) {
                        return false;
                    }
                })
                .join(', ')}]`;
            this.setState({ logs: JSON.parse(logs) });
        });
    }

    listenForLogs() {
        if (this.logListenerInterval === undefined) {
            this.logListenerInterval = window.setInterval(() => this.updateLogs(), 5000);
        }
    }

    logItem(level: string, message: string, key: number) {
        let levelColor: string;

        switch (level) {
            case 'info':
                levelColor = 'blue';
                break;
            case 'error':
                levelColor = 'red';
                break;
            case 'warn':
                levelColor = 'orange';
                break;
            case 'debug':
                levelColor = 'gray';
                break;
            default:
                levelColor = 'black';
        }

        return (
            <div
                className={`log-item ${level}-log-item`}
                key={key}
                style={{
                    padding: '1.5rem',
                    boxSizing: 'border-box',
                    boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.5)',
                    background: 'white',
                    marginBottom: '2rem',
                }}
            >
                <span
                    style={{
                        background: levelColor,
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem 0.25rem 0.5rem',
                        color: 'white',
                        fontWeight: 'bold',
                        marginBottom: '0.1rem',
                    }}
                >
                    {level.toUpperCase()}
                </span>
                <pre style={{ fontFamily: 'monospace', margin: '0', fontSize: '1rem' }}>
                    {message}
                </pre>
            </div>
        );
    }
}

export default WinstonViewer;