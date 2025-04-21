import {useRef, useState, useCallback, useEffect} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {fetchAvailablePlaces, fetchUserPlaces, updateUserPlaces} from "./http.js";
import {sortPlacesByDistance} from "./loc.js";
import Error from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);

    async function fetchPlaces() {
      try {
        const places = await fetchUserPlaces();
          setUserPlaces(places)
      } catch (error) {
        setError({
          message: error.message || 'Could not fetch user places, please try again later'
        });
      }

      setIsLoading(false);
    }

    fetchPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      //if an error occurred set the old user places
      setUserPlaces(userPlaces);

      setError({
        message: error.message || 'Failed to update places, please try again later'
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );
    } catch (error) {
      //if an error occurred set the old user places
      setUserPlaces(userPlaces);

      setError({
        message: error.message || 'Failed to delete place, please try again later'
      });

    }

    setModalIsOpen(false);
  }, [userPlaces]);

  function handleError() {
    setError(null);
  }

  return (
    <>
      <Modal open={error} onClose={handleError} >
        {
          error &&
            <Error
            title="An error occurred"
            message={error.message}
            onConfirm={handleError}
        />
        }
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          isLoading={isLoading}
          loadingText="Fetching user place data."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
