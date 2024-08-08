"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { format } from "date-fns";

const FormLayout = () => {
  const [formData, setFormData] = useState({
    childName: "",
    guardianName: "",
    phoneNumber: "",
    address: "",
    timeIn: "",
    dob: null, // Initialize with null
    timeOut: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.childName) newErrors.childName = "Child's name is required";
    if (!formData.guardianName)
      newErrors.guardianName = "Guardian's name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.timeIn) newErrors.timeIn = "Time in is required";
    if (!formData.timeOut) newErrors.timeOut = "Time out is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formattedValues = {
      ...formData,
      dob: formData.dob ? format(formData.dob, "yyyy-MM-dd") : "", // Format date
    };

    try {
      const response = await axios.post(
        "/api/child/signUpChild",
        formattedValues,
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          childName: "",
          guardianName: "",
          phoneNumber: "",
          address: "",
          timeIn: "",
          dob: null,
          timeOut: "",
        });
        setErrors({});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <h2 className="header">Consent Form</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label">Child Name</label>
              <input
                type="text"
                id="childName"
                name="childName"
                placeholder="Enter child's name"
                value={formData.childName}
                onChange={(e) =>
                  setFormData({ ...formData, childName: e.target.value })
                }
                className="input input-height"
              />
              {errors.childName && (
                <p className="error-text">{errors.childName}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="label">Date of Birth (DOB)</label>
              <div className="date-picker-container">
                <DatePicker
                  className="date-picker-input" // Ensure this class applies the same styling
                  id="dob"
                  name="dob"
                  selected={formData.dob}
                  onChange={(date) => setFormData({ ...formData, dob: date })}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="mm/dd/yyyy"
                />
                <i className="calendar-icon fas fa-calendar-alt"></i>
              </div>
              {errors.dob && <p className="error-text">{errors.dob}</p>}
            </div>


            <div className="mb-4">
              <label className="label">Guardian Name</label>
              <input
                type="text"
                id="guardianName"
                name="guardianName"
                placeholder="Enter guardian's name"
                value={formData.guardianName}
                onChange={(e) =>
                  setFormData({ ...formData, guardianName: e.target.value })
                }
                className="input input-height"
              />
              {errors.guardianName && (
                <p className="error-text">{errors.guardianName}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="label">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="input input-height"
              />
              {errors.phoneNumber && (
                <p className="error-text">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="label">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="input input-height"
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>

            <div className="flex-container">
              <div className="half-width">
                <label className="label">Time In</label>
                <input
                  type="time"
                  id="timeIn"
                  name="timeIn"
                  value={formData.timeIn}
                  onChange={(e) =>
                    setFormData({ ...formData, timeIn: e.target.value })
                  }
                  className="input input-height"
                />
                {errors.timeIn && <p className="error-text">{errors.timeIn}</p>}
              </div>
              <div className="half-width">
                <label className="label">Time Out</label>
                <input
                  type="time"
                  id="timeOut"
                  name="timeOut"
                  value={formData.timeOut}
                  onChange={(e) =>
                    setFormData({ ...formData, timeOut: e.target.value })
                  }
                  className="input input-height"
                />
                {errors.timeOut && (
                  <p className="error-text">{errors.timeOut}</p>
                )}
              </div>
            </div>

            <div className="button-container">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? <ClipLoader color="#ffffff" size={20} /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
