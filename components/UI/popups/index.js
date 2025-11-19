import styles from "./popup.module.css";

export default function Popup({ isOpen, children, onCancel, title, footer }) {
  return (
    <>
      {isOpen && (
        <>
          <Backdrop onCancel={onCancel} />
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.title}>{title}</div>
              <div onClick={onCancel} className={styles.close}>
                X
              </div>
            </div>
            <div className={styles.body}>{children}</div>
            <div className={styles.footer}>{footer}</div>
          </div>
        </>
      )}
    </>
  );
}

function Backdrop({ onCancel }) {
  return (
    <div
      onClick={onCancel}
      className="fixed top-0 left-0 z-20 w-full h-screen bg-black opacity-40 "
    ></div>
  );
}
