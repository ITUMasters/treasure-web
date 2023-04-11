import ReactLoading from "react-loading";
export function Loader() {
  return (
    <div className="flex justify-center mt-40 ">
      <ReactLoading
        type="spinningBubbles"
        color={"#5B3DF6"}
        height={"15%"}
        width={"15%"}
      />
    </div>
  );
}
