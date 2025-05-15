import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { FiUploadCloud } from "react-icons/fi";

const Raise_concern_popup = ({ show, handleClose }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log("Dropped files:", files);

    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    // You can process or upload files here
    console.log("Processing file:", files[0]);

    // If you want to update file input manually (optional):
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(files[0]);
    fileInputRef.current.files = dataTransfer.files;
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log("Selected via click:", files[0]);
    handleFiles(files);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="hold_reason_modal  raise_concern_popup"
      backdrop="static"
    >
      <Modal.Header
        style={{ backgroundColor: "#e6f0ff" }}
        closeButton
        className="hold_popup_header"
      >
        <Modal.Title>Raise Concern </Modal.Title>
      </Modal.Header>
      <Modal.Body className="hold_popup_body">
        <div>
          <form className="raise_concern_popup_form">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0 fw-bold">Vendor Name</h5>
              <div className="bg-light border px-3 py-1 rounded-3 text-muted">
                <span>
                  AA no - <strong>123456789</strong>
                </span>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="selectDate"
                    className="form-label fw-semibold"
                  >
                    Date
                  </label>
                  <input
                    type="text"
                    id="selectDate"
                    className="form-control py-3"
                    placeholder="Date"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="selectTime"
                    className="form-label fw-semibold"
                  >
                    Time
                  </label>
                  <input
                    type="text"
                    id="selectTime"
                    className="form-control py-3"
                    placeholder="Date"
                  />
                </div>
              </div>
            </div>
            {/* Status Dropdown */}
            <div className="mb-3">
              <label htmlFor="statusSelect" className="form-label fw-semibold">
                Status
              </label>
              <select
                className="form-select py-3"
                id="statusSelect"
                required
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select Status
                </option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="statusSelect" className="form-label fw-semibold">
                Remarks Category
              </label>
              <select
                className="form-select py-3"
                id="statusSelect"
                required
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select Remarks Category
                </option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="issueConcern" className="form-label fw-semibold">
                Remarks Issue
              </label>
              <textarea
                className="form-control rounded-2"
                id="issueConcern"
                rows="4"
                placeholder="Enter your issues"
              ></textarea>
            </div>
            <div
              onClick={handleClick}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="text-center p-4"
              style={{
                border: "1px dashed #ccc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <FiUploadCloud size={28} color="#6c757d" />
              <p className="mt-2 mb-0 text-muted raise_drag">
                Drag and drop or <span className="text-primary">browse</span>{" "}
                your files
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className="d-none"
                onChange={handleFileChange}
              />
            </div>
            <div
              className="d-flex justify-content-center align-items-center gap-4 "
              style={{ marginTop: "50px" }}
            >
              <div>
                <div>
                  <button
                    className="btn btn-primary d-flex align-items-center"
                    style={{
                      backgroundColor: "#8000d7",
                      border: "none",
                      padding: "10px 80px",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "16px",
                    }}
                  >
                    <span className="ms-2">Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Raise_concern_popup;
