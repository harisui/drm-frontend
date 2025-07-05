import React from "react";
import { Filter, ChevronDown } from "lucide-react";

interface LocationFilterProps {
  show: boolean;
  onToggle: () => void;
  onClear: () => void;
  availableCountries: string[];
  availableStates: string[];
  availableCities: string[];
  selectedCountry: string | null;
  selectedState: string | null;
  selectedCity: string | null;
  setSelectedCountry: (country: string) => void;
  setSelectedState: (state: string) => void;
  setSelectedCity: (city: string) => void;
  getFilterDisplayText: () => string;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  show,
  onToggle,
  onClear,
  availableCountries,
  availableStates,
  availableCities,
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
  getFilterDisplayText,
}) => (
  <div className="flex w-full max-w-[1440px] mx-auto mb-4">
    <div className="ml-auto relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Filter size={16} className="text-gray-500" />
        <span>{getFilterDisplayText()}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            show ? "rotate-180" : ""
          }`}
        />
      </button>
      {show && (
        <div className="absolute right-0 z-10 w-64 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="py-1">
            {/* Clear All Filters */}
            <button
              onClick={onClear}
              className={`block w-full px-4 py-2 text-left text-sm ${
                !selectedState && !selectedCity && !selectedCountry
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Locations
            </button>
            {/* Countries Section */}
            {availableCountries.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-t border-gray-200">
                  Countries
                </div>
                {availableCountries.map((country) => (
                  <button
                    key={country}
                    onClick={() => {
                      setSelectedCountry(country);
                      setSelectedState(null);
                      setSelectedCity(null);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      selectedCountry === country
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </>
            )}
            {/* Cities Section */}
            {availableCities.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-t border-gray-200">
                  Cities
                </div>
                {availableCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setSelectedState(null);
                      setSelectedCountry(null);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      selectedCity === city
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </>
            )}
            {/* States Section */}
            {availableStates.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-t border-gray-200">
                  States
                </div>
                {availableStates.map((state) => (
                  <button
                    key={state}
                    onClick={() => {
                      setSelectedState(state);
                      setSelectedCity(null);
                      setSelectedCountry(null);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      selectedState === state
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default LocationFilter;
