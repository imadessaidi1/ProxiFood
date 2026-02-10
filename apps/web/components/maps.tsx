export function MapViewContainer({ title }: { title: string }) {
  return (
    <div className="h-56 rounded-2xl bg-gradient-to-br from-green-100 to-amber-100 p-4">
      <p className="text-sm text-gray-600">Google Maps</p>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm">Autocomplete, route polyline et tracking live Socket.IO.</p>
    </div>
  );
}
