import axios from "axios";
import React, { useEffect } from "react";
import { Chip } from "@mui/material";

const Genres = ({
  selectedGenres,
  setselectedGenres,
  genres,
  setGenres,
  setPage,
  type,
}) => {
  const handleAdd = (genre) => {
    setselectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setselectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };
  const REACT_APP_API_KEY = "af8f2f455a33bb13f8f255adf798159c";

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  console.log(genres);

  useEffect(() => {
    fetchGenres();

    // return () => {
    //   setGenres({});
    // };
  }, []);

  return (
    <div style={{ padding: "6px 0 " }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            clickable
            key={genre.id}
            label={genre.name}
            size="small"
            color="primary"
            style={{ margin: 2, color: "white" }}
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            clickable
            key={genre.id}
            label={genre.name}
            size="small"
            style={{ margin: 2, color: "white" }}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
