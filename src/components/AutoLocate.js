import { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

const AutoLocate = ({ value, handleChange }) => {
  const { address, setAddress } = useState("");

  const handleSelect = async () => {};

  return (
    <div>
      <PlacesAutocomplete
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
          <div>
            <input
              {...getInputProps({ placeholder: "Search your location" })}
            />
            <div>
              {loading ? <div>...Loading</div> : ""}
              {suggestions.map((suggestion) => {
                return (
                  <div {...getSuggestionItemProps()}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>;
        }}
      </PlacesAutocomplete>
    </div>
  );
};

export default AutoLocate;
