import React from "react";
// import * as Sentry from "@sentry/browser";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({ hasError: true });
    // Sentry.withScope(scope => {
    //   Object.keys(errorInfo).forEach(key => {
    //     scope.setExtra(key, errorInfo[key]);
    //   });
    //   Sentry.captureException(error);
    // });
  }

  render() {
    if (this.state.hasError) {
      return (
        <h4 className="mt-5 text-center">Something went wrong. Try reloading the app.</h4>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
