import React from "react";

function ErrorPage({ statusCode }) {
  return (
    <div style={styles.container}>
      <h1>Oops! Something went wrong.</h1>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on the client"}
      </p>
      <button onClick={() => window.location.reload()} style={styles.button}>
        Refresh Page
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderRadius: "10px",
    margin: "20px",
  },
  button: {
    backgroundColor: "#d9534f",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
