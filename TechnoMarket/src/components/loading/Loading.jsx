import { MDBSpinner } from "mdb-react-ui-kit";

const Loading = () => {
  return (
    <div className="min-w-[100vw] min-h-[100vh] flex justify-center items-center bg-sky-100">
      <MDBSpinner grow color="primary">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};

export default Loading;
