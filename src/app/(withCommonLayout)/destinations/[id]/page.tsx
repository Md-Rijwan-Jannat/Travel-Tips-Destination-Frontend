import { destinations } from '@/src/lib/data';
import DestinationDetails from '../../_component/module/destination/destinationDetails';

export default function DestinationPage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params);
  const destination = destinations.find((d) => d.id === params.id);

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return <DestinationDetails destination={destination} />;
}
