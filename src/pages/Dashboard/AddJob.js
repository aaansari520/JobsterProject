import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
import {
  clearValues,
  createJob,
  handleChange,
  editJob,
} from "../../features/job/jobSlice";

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
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const refCon = useRef();

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
    refCon.current.focus();
  }, []);

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
    // console.log(e.target);
    console.log(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit values");
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
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
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>

        <div className="form-center">
          {/* position */}
          <FormRow
            refCon={refCon}
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
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
