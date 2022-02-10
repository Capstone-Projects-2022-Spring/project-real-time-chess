import * as React from "react";
import InputField from "./InputField";

export interface SignUpTabProps {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

export default class SignUpTabComponent extends React.Component<{}, {}> {
    constructor(props: SignUpTabProps = {fname: '', lname: '', email: '', password: ''}) {
        super(props);
    }

    render() {
        return (
            <div>
                <InputField />
            </div>
        );
    }
}