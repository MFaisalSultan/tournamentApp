import React, { useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CommonAccordion from "../../components/Accordion";
import { createTournaments } from "../../redux/user/asyncThunk";
import { setLoading, setTournaments } from "../../redux/user/userSlice";
import { loadTournaments } from "../../services/firebase";

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const _loadTournaments = async () => {
    dispatch(setLoading(true));
    try {
      const tournaments = await loadTournaments();
      console.log(tournaments);
      dispatch(setTournaments(tournaments));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    _loadTournaments();
  }, []);

  const onClick = useCallback(() => {
    dispatch(createTournaments());
  });
  return (
    <div className="container  mt-4">
      {loading ? (
        <div style={{ color: "white" }}>Loading...</div>
      ) : (
        <div className="row center mt-4">
          {!!error && <div style={{ color: "red" }}>{error}</div>}
          <Button onClick={onClick} disabled={loading}>
            {" "}
            Start Tournament{" "}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
