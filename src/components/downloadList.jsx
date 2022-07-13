import { useState, useEffect, useRef } from "react";
import Modal from "./modal";

export default function DownloadList({ data }) {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [modalOpen, setModalOpenState] = useState(false);
  const [modalList, setModalList] = useState([]);

  //check which downloads in our list are available status
  const availableDownloads = data.filter((e) => e.status === "available");

  useEffect(() => {
    //setup an event listener to close the downloads modal on escape keypress
    const closeModalOnEscape = (e) => {
      if (e.keyCode === 27) {
        setModalOpenState(false);
      }
    };
    window.addEventListener("keydown", closeModalOnEscape);
    return () => window.removeEventListener("keydown", closeModalOnEscape);
  }, []);

  useEffect(() => {
    //if more than one download is selected make our select all checkbox indeterminate
    selectAllRef.current.indeterminate = isCheck.length > 0;

    //if we have zero checked make sure our select all checkbox is turned off
    if (isCheck.length === 0) {
      selectAllRef.current.checked = false;
      setIsCheckAll(false);
    }

    // if we have selected all downloads turn off indeterminate and turn the selected all checkbox on
    if (
      availableDownloads.length > 0 &&
      isCheck.length === availableDownloads.length
    ) {
      selectAllRef.current.indeterminate = false;
      selectAllRef.current.checked = true;
      setIsCheckAll(true);
    }
  }, [availableDownloads, isCheck]);

  const handleOnListItemClick = (e) => {
    const { name, checked } = e.target;
    //set to checked via name
    setIsCheck([...isCheck, name]);
    // if we aren't currently checked toggle it
    !checked && setIsCheck(isCheck.filter((item) => item !== name));
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);

    //map thru all the available downloads and set them as checked
    setIsCheck(
      availableDownloads.map((li) => {
        return li.status === "available" ? li.name : [];
      })
    );

    //if we are already selected all clear the array of selected items
    isCheckAll && setIsCheck([]);
  };

  const handleDownloadClick = () => {
    let alertList = [];

    isCheck.forEach((item) => {
      const x = data.find((downloadList) => downloadList.name === item);
      alertList.push(x);
    });

    //add each item that matches the names we have in our state for selected items to the modal state
    setModalList(alertList);
    setModalOpenState(!modalOpen); // toggle the modal open and close
  };
  const selectAllRef = useRef();

  return (
    <>
      <nav role="navigation">
        <ul>
          <li>
            <input
              data-testid="selectAll"
              type="checkbox"
              ref={selectAllRef}
              onChange={(event) => handleSelectAll(event.target.checked)}
            />
            {isCheck.length === 0
              ? "None Selected"
              : `Selected ${isCheck.length}`}
          </li>
          <li>
            <button
              className="downloadLink"
              data-testid="downloadLink"
              disabled={isCheck.length === 0}
              onClick={(event) => handleDownloadClick(event.target.checked)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                style={{ float: "left" }}
              >
                <path d="M10 12.917Q9.833 12.917 9.677 12.854Q9.521 12.792 9.375 12.646L6.333 9.604Q6.062 9.333 6.062 8.979Q6.062 8.625 6.333 8.354Q6.604 8.083 6.958 8.083Q7.312 8.083 7.583 8.354L9.125 9.896V4.208Q9.125 3.854 9.385 3.594Q9.646 3.333 10 3.333Q10.354 3.333 10.615 3.594Q10.875 3.854 10.875 4.208V9.896L12.417 8.354Q12.688 8.083 13.042 8.083Q13.396 8.083 13.667 8.354Q13.938 8.625 13.938 8.979Q13.938 9.333 13.667 9.604L10.625 12.646Q10.479 12.792 10.323 12.854Q10.167 12.917 10 12.917ZM5.083 16.667Q4.354 16.667 3.844 16.156Q3.333 15.646 3.333 14.917V13.375Q3.333 13.021 3.594 12.76Q3.854 12.5 4.208 12.5Q4.562 12.5 4.823 12.76Q5.083 13.021 5.083 13.375V14.917Q5.083 14.917 5.083 14.917Q5.083 14.917 5.083 14.917H14.917Q14.917 14.917 14.917 14.917Q14.917 14.917 14.917 14.917V13.375Q14.917 13.021 15.177 12.76Q15.438 12.5 15.792 12.5Q16.146 12.5 16.406 12.76Q16.667 13.021 16.667 13.375V14.917Q16.667 15.646 16.156 16.156Q15.646 16.667 14.917 16.667Z" />
              </svg>
              Download Selected
            </button>
          </li>
        </ul>
      </nav>

      {modalOpen && <Modal list={modalList} close={setModalOpenState} />}

      <table data-testid="downloadLogTable">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((logItem, i) => {
            const { name, device, path, status } = logItem;
            const selected = isCheck.includes(logItem.name);
            return (
              <tr
                key={i}
                className={`${selected && "selected"} ${logItem.status}`}
              >
                <td>
                  <input
                    type="checkbox"
                    name={logItem.name}
                    onChange={handleOnListItemClick}
                    checked={selected}
                    disabled={logItem.status !== "available"}
                    data-testid={`item${i}`}
                  />
                </td>
                <td>{name}</td>
                <td>{device}</td>
                <td>{path}</td>
                <td className={`status ${status}`}>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
