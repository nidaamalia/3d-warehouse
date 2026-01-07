export default function ItemConditionLegend() {
  const conditions = [
    { label: 'Good', color: '#22c55e' },
    { label: 'Damage', color: '#ef4444' },
    { label: 'Quarantine', color: '#eab308' },
    { label: 'Scrap', color: '#000000' },
  ];

  return (
    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 text-xs">
      <div className="text-slate-200 font-semibold mb-2">Item Condition</div>
      <div className="space-y-1.5">
        {conditions.map((condition) => (
          <div key={condition.label} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded border border-slate-700"
              style={{ backgroundColor: condition.color }}
            />
            <span className="text-slate-300">{condition.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
