import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import AutoLocate from "../../components/AutoLocate";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
import {
  clearValues,
  createJob,
  handleChange,
  editJob,
} from "../../features/job/jobSlice";
import { validate } from "../../features/validations/validation";

import PlacesAutocomplete from "react-places-autocomplete";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobTypeOption,
    jobType,
    statusOption,
    status,
    isEditing,
    editJobId,
    jobLocation,
  } = useSelector((store) => store.job);
  const [state, setState] = useState({ position, company, jobLocation });
  const [formsErrors, setFormsErrors] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const refCon = useRef();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  // useEffect(() => {
  //   if (!isEditing) {
  //     dispatch(handleChange({ name: "jobLocation", value: user.location }));
  //   }
  //   refCon.current.focus();
  // }, []);

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
    dispatch(handleChange({ name, value }));
    // console.log(e.target);
    console.log(name, value);
  };

  const handleJ = (e) => {
    // const { value } = e.target;
    // setState({ ...state, ["jobLocation"]: e.target.value });
    // dispatch(handleChange({ name, value }));
    console.log("LOcation", e.target.name);
  };

  const handleSelect = async () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formsErrors) {
      setFormsErrors(validate(state));
      if (!position || !company || !jobLocation) {
        return toast.error("All fields are required");
      }
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }

    dispatch(createJob({ position, company, jobLocation, jobType, status }));
    navigate("/all-jobs");
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>

        <div className="form-center">
          {/* position */}
          <div>
            <FormRow
              refCon={refCon}
              type="text"
              name="position"
              value={position}
              handleChange={handleJobInput}
              formsErrors={formsErrors}
            />
            <p className="errorText">{!position ? formsErrors.position : ""}</p>
          </div>
          <div>
            <FormRow
              type="text"
              name="company"
              value={company}
              handleChange={handleJobInput}
            />
            <p className="errorText">{!company ? formsErrors.company : ""}</p>
          </div>
          <div>
            {/* <FormRow
              type="text"
              name="jobLocation"
              value={jobLocation}
              handleChange={handleJobInput}
            /> */}
            {/* <p className="errorText">
              {!jobLocation ? formsErrors.jobLocation : ""}
            </p> */}
            {/* <AutoLocate
              type="text"
              name="jobLocation"
              value={jobLocation}
              handleChange={handleJobInput}
            /> */}
            <PlacesAutocomplete
              // value={jobLocation}
              value={address}
              // name="jobLocation"
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                getSuggestionItemProps,
                suggestions,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({ placeholder: "Search your location" })}
                  />
                  <div>
                    {loading ? <div>...Loading</div> : null}
                    {suggestions.map((suggestion) => {
                      return (
                        <div {...getSuggestionItemProps()}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <FormRowSelect
            labelText="Job Type"
            name="jobType"
            value={jobType}
            list={jobTypeOption}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            labelText="Status"
            name="status"
            value={status}
            list={statusOption}
            handleChange={handleJobInput}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>

            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
