import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
  //const [workouts, setWorkouts] = useState(null);
  const {workouts, dispatch} = useWorkoutsContext();
  useEffect(() => {
    
    const fetchData = async () => {
        const response = await fetch("/api/v1/workout");
        const json = await response.json()
        if(response.ok){
            //setWorkouts(json.data.workouts);
            dispatch({type: 'SET_WORKOUTS', payload:json.data.workouts})
        }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout= {workout}/>
            ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
