import React from "react";
import styles from "./ErrorBoundary.module.css"; // Create this CSS file for styling

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ paddingTop: '100px' }}>
          <div className={styles.errorContainer}>
            <h1 style={{ paddingTop: '100px' }}></h1>
            <h2>Oops! Something went wrong.</h2>
            <p>Please refresh the page and try again.</p>
            <button className={styles.refreshButton} onClick={this.handleRefresh}>
              Refresh Page
            </button>
          </div>
        </div> 
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;