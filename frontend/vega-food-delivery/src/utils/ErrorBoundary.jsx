import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);

    // Check if it's a network error (Axios)
    if (error.message.includes("Network Error")) {
      this.setState({ errorMessage: "Network error: Please check your internet connection." });
    } else {
      this.setState({ errorMessage: "Something went wrong!" });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
    window.location.reload(); // Reload the page to attempt recovery
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-5">
          <h2 className="text-danger">{this.state.errorMessage}</h2>
          <button className="btn btn-primary mt-3" onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
