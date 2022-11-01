import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const {dispatch} = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(`/api/v1/workout/${workout._id}`, {
      method: 'DELETE'
    })
    console.log(response)
    const json = await response.json()
    if(response.ok){
        dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): {workout.load}</strong>
      </p>
      <p>
        <strong>Reps: (kg) {workout.reps}</strong>
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default WorkoutDetails