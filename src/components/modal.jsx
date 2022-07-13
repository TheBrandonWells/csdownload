import React from "react";

export default function Modal({ close, list }) {
  return (
    <div className="modal">
      <div className="modalContent">
        <button
          className="closeModal"
          onClick={() => close()}
          data-testid="modalClose"
        >
          &times;
        </button>
        <header>
          <h3>Downloads</h3>
        </header>
        {list.map((download, i) => {
          return (
            <section key={i}>
              <div>
                <strong>Progress:</strong>
                <div className="progress-bar">
                  <div className="progress">
                    <div className="progress-shadow"></div>
                  </div>
                </div>
              </div>

              <div className="pathInfo">
                <strong>Path:</strong>
                {download.path}
              </div>

              <div className="deviceInfo">
                <strong>Device:</strong>
                {download.device}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
