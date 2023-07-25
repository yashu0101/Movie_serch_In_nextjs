import axios from "axios";
import React, { useEffect, useState } from "react";
import useGenres from "../../../hooks/useGenre";
import Genres from "../../Genres";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setselectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);
  const REACT_APP_API_KEY = "af8f2f455a33bb13f8f255adf798159c";

  const fetchMovies = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/discover/tv?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
    console.log(data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);
  return (
    <div>
      <span className="pageTitle">Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setselectedGenres={setselectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && <CustomPagination setPage={setPage} />}
    </div>
  );
};

export default Series;
