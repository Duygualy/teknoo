import Card from "../components/Card"; 
import "../styles/Dashboard.css"; 

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Card
       title="Trip Master" 
       description="With our smart guide ai plan your TRNC trip ..."
       image="/pic1.jpg" 
       />
      <Card 
       title="Augmented Reality" 
       description="See an historic view of key landmarks ..."
       image="/pic2.png" 
       />
      <Card 
       title="Event Tracker" 
       description="Keep in the know about latest event and activites on the island..." 
       image="/pic3.jpg"
       />
      <Card 
       title="Transportation" 
       description="Handle all transportation matter- buss schedules,taxi services ..." 
       image="/pic4.jpg"
       />
    </div>
  );
}