const Filter = (props) => {
  return (
    <div>
      <p>filter shown with <input value = {props.value} onChange = {props.onChange}/> </p>
    </div>
  );
};

export default Filter