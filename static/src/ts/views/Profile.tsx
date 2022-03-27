import * as React from 'react';

interface ProfileProps {
    username: string;
}

interface ProfileState {
    username: string;
}

/**
 * The profile screen component.
 */
class Profile extends React.Component<ProfileProps, ProfileState> {
    /**
     * Creates an instance of Profile.
     * @param props - No props.
     */
    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            username: props.username,
        };
    }

    /**
     * @returns The react element for the Profile view.
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Profile</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
export { ProfileProps, ProfileState };
