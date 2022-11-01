import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("/api/v1/workout", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added");
      dispatch({type:'CREATE_WORKOUT', payload: json.data.workout})
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Exercise Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <br />
      <label>Load (in KG):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <br />
      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <input type="submit" value="Add Workout" />
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default WorkoutForm;
