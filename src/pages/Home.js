import Countdown from '../components/Countdown';
import Card from '../components/Card';

export default function Home() {
  return (
    <div>
      <Card className="bg-gray-800 flex justify-center">
        <Countdown />
      </Card>
      <Card className="bg-gray-800 flex justify-center">
        <iframe
          src="https://open.spotify.com/embed/playlist/2Gf7I3Gpn2fEUf1ifKCRK3"
          width="300"
          height="380"
          frameBorder="0"
          allowTransparency="true"
          allow="encrypted-media"
        ></iframe>
      </Card>
    </div>
  );
}
