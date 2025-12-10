import { MdClose } from "react-icons/md";
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
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel();
                }}
                className={styles.close}
              >
                <MdClose />
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
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      className="fixed top-0 left-0 z-20 w-full h-screen bg-black opacity-40 "
    ></div>
  );
}

export function PopupConfirmAction({ isOpen, onCancel, onConfirm, message }) {
  return (
    <Popup
      isOpen={isOpen}
      onCancel={onCancel}
      title="Confirm Action"
      footer={ConfirmActionFooter(onConfirm, onCancel)}
    >
      <div>{message}</div>
    </Popup>
  );
}

export const ConfirmActionFooter = (onConfirm, onCancel) => {
  return (
    <div className="frc gap-2">
      <div className="btn btn-danger" onClick={onConfirm}>
        Confirm
      </div>
      <div className="btn " onClick={onCancel}>
        Cancel
      </div>
    </div>
  );
};
