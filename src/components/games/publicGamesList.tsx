import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPublicGamesListForUser } from "../../actions/game/gameActions";
import { AppState } from "../../store";
import { IUserGamesStore, GameStatus } from "../../model/game/game";

// MUI
import Container from "@material-ui/core/Container";
import { SubHeadingWrapper } from "../../styles/styles";
import PublicGamesListItem from "./publicGamesListItem";
import { sortGamesForWishlist } from "../../helpers/sortGames";

interface Props {
  userGames: IUserGamesStore;
  getPublicGamesListForUser(user_id: string): void;
}

const PublicGamesList: React.FC<Props> = ({
  userGames,
  getPublicGamesListForUser
}) => {
  const { user_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      await getPublicGamesListForUser(user_id);
    } catch (e) {
      throw e
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // start sort
  const { games } = userGames;
  const gamesPlaying = games.filter((g) => g.status === GameStatus.PLAYING);
  const gamesFinished = games.filter((g) => g.status === GameStatus.FINISHED);
  const gamesOnHold = games.filter((g) => g.status === GameStatus.ON_HOLD);
  const gamesWishlist = sortGamesForWishlist(games);
  
  return(
    <>
      <Container>
          <SubHeadingWrapper>
            <h1>Inventory</h1>
          </SubHeadingWrapper>

          {console.log("user games: ", games)}

          {isLoading ? (
            <p style={{ margin: "30px 0" }}>loading...</p>
          ) : (
            <>
              {games.length === 0 && <p style={{margin: "30px 0"}}>List is empty.</p>}
              {gamesPlaying.length ? (
                <PublicGamesListItem title="Playing" games={gamesPlaying} />
              ) : (
                ""
              )}
              {gamesWishlist.length ? (
                <PublicGamesListItem title="Wishlist" games={gamesWishlist} />
              ) : (
                ""
              )}
              {gamesOnHold.length ? (
                <PublicGamesListItem title="On Hold" games={gamesOnHold} />
              ) : (
                ""
              )}
              {gamesFinished.length ? (
                <PublicGamesListItem title="Finished" games={gamesFinished} />
              ) : (
                ""
              )}
            </>
          )}
      </Container>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  userGames: state.userGames,
});

const mapDispatchToProps = {
  getPublicGamesListForUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicGamesList);
