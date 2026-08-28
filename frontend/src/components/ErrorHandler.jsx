import React from "react";

class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong.</h2>

                    <button
                        className="btn-primary"
                        onClick={this.handleReload}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorHandler;