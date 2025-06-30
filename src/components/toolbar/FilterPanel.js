import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterPanel = ({
  localFilters,
  setLocalFilters,
  categories,
  patients,
  applyFilters,
}) => {
  return (
    <>
      {/* Category Filter */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Kategorie
        </label>
        <Select
          onValueChange={(value) =>
            setLocalFilters((prev) => ({ ...prev, category: value }))
          }
          value={localFilters.category}
        >
          <SelectTrigger
            className="w-full"
            id="category"
            aria-label="Kategorie wählen"
          >
            <SelectValue placeholder="Kategorie wählen" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">Alle</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Patient Filter */}
      <div>
        <label htmlFor="patient" className="block text-sm font-medium mb-1">
          Patient
        </label>
        <Select
          onValueChange={(value) =>
            setLocalFilters((prev) => ({ ...prev, patient: value }))
          }
          value={localFilters.patient}
        >
          <SelectTrigger
            className="w-full"
            id="patient"
            aria-label="Patient wählen"
          >
            <SelectValue placeholder="Patient wählen" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">Alle</SelectItem>
            {patients.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.firstname} {p.lastname}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date Filter */}
      <div>
        <label className="block text-sm font-medium mb-1">Zeitraum</label>
        <div className="flex gap-2">
          <input
            type="date"
            className="w-full border rounded px-2 py-1 text-sm"
            value={localFilters.startDate}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                startDate: e.target.value,
              }))
            }
            aria-label="Startdatum"
          />
          <input
            type="date"
            className="w-full border rounded px-2 py-1 text-sm"
            value={localFilters.endDate}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                endDate: e.target.value,
              }))
            }
            aria-label="Enddatum"
          />
        </div>
      </div>

      {/* Apply Button */}
      <div className="pt-2">
        <button
          onClick={applyFilters}
          className="w-full px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
        >
          Filter anwenden
        </button>
      </div>
    </>
  );
};

export default FilterPanel;
