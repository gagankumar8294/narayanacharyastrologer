
import styles from "../styles/Blog.module.css";
const Terms = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Terms and Conditions</h1>
      <p className={styles.paragraph}>
        Welcome to CodeAspirant! By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions:
      </p>
      <h2 className={styles.subheading}>Services</h2>
      <p className={styles.paragraph}>
        CodeAspirant provides web development services to clients in Bangalore, including website design, development, and maintenance. All services are provided according to the agreed-upon scope and timeline.
      </p>
      <h2 className={styles.subheading}>Payments</h2>
      <p className={styles.paragraph}>
        Payments for services must be made according to the payment schedule outlined in the project agreement. Delayed payments may result in a pause or termination of services.
      </p>
      <h2 className={styles.subheading}>Intellectual Property</h2>
      <p className={styles.paragraph}>
        All content and materials created by CodeAspirant for clients, including websites, graphics, and code, remain the intellectual property of CodeAspirant until full payment is received. Upon full payment, intellectual property rights will transfer to the client as outlined in the project agreement.
      </p>
      <h2 className={styles.subheading}>Use of Services</h2>
      <p className={styles.paragraph}>
        Clients agree to use our services for lawful purposes only and comply with all applicable laws and regulations. Any illegal or unauthorized use of our services is strictly prohibited.
      </p>
      <h2 className={styles.subheading}>Limitation of Liability</h2>
      <p className={styles.paragraph}>
        CodeAspirant is not liable for any damages or losses resulting from the use of our services, including but not limited to direct, indirect, incidental, punitive, or consequential damages.
      </p>
      <h2 className={styles.subheading}>Amendments</h2>
      <p className={styles.paragraph}>
        We reserve the right to modify these terms and conditions at any time. Any changes will be posted on our website, and continued use of our services after such changes constitutes acceptance of the new terms.
      </p>
      <h2 className={styles.subheading}>Contact Us</h2>
      <p className={styles.paragraph}>
        If you have any questions or concerns about these terms and conditions, please contact us at <a href="mailto:youremail@example.com">your email address</a> or call us at +919148644611.
      </p>
    </div>
  );
};

export default Terms;