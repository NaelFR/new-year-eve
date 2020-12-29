import Countdown from '../components/Countdown';
import Card from '../components/Card';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Card className="bg-gray-800 flex justify-center">
        <Countdown />
      </Card>
    </div>
  );
}
