const ViewModeSelector = ({ viewModes, activeMode, setActiveMode }) => {
  return (
    <div>
      <div className="flex justify-between gap-2 w-fit bg-gray-300 px-2 py-1 rounded-lg">
        {viewModes.map((mode) => (
          <div
            key={mode}
            onClick={() => setActiveMode(mode)}
            className={`cursor-pointer text-gray-700 py-1 px-3 rounded-md ${
              mode === activeMode ? "bg-white" : ""
            }`}
          >
            {mode}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewModeSelector;
