import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { callFetchGamesApi, callDeleteGameApi, executeClearSearchedGame } from '../../actions/game/gameActions';
import { AppState } from '../../store';
import { IUserGamesStore, GameStatus } from '../../model/game/game';
import isTokenExpired from '../../helpers/isTokenExpired';
import GameTable from './gameTable';

// MUI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import { ButtonWrapper, ContainerInner, SubHeadingWrapper, AlignRight, ShareLink } from '../../styles/styles';
import { Link as MaterialUiLink } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { sortGamesForWishlist } from '../../helpers/sortGames';

interface Props {
    userGames: IUserGamesStore;
    callFetchGamesApi(user_id: string): void;
    executeClearSearchedGame(): void;
}

const Games: React.FC<Props> = ({ userGames, callFetchGamesApi, executeClearSearchedGame }) => {
    const history = useHistory();
    const { user_id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    console.log('user games: ', userGames.games);

    const redirectToAddGamePage = () => {
        executeClearSearchedGame(); // do we need this? add game has its own
        history.push(`/user/${user_id}/games/add`);
    };

    const copyShareLink = async () => {
        const text = `https://${window.location.host}/public/games/user/${user_id}`;
        await navigator.clipboard.writeText(text);
    };

    const fetchGames = async () => {
        try {
            setIsLoading(true);
            await callFetchGamesApi(user_id);
        } catch (e) {
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isTokenExpired()) {
            console.log('IS EXPIRED? ', isTokenExpired());
            history.push('/login');
        }
        fetchGames();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sort games
    const { games } = userGames;
    const gamesPlaying = games.filter(g => g.status === GameStatus.PLAYING);
    const gamesFinished = games.filter(g => g.status === GameStatus.FINISHED);
    const gamesOnHold = games.filter(g => g.status === GameStatus.ON_HOLD);
    const gamesWishlist = sortGamesForWishlist(games);

    return (
        <>
            <Container>
                <ContainerInner>
                    <ShareLink>
                        <AlignRight>
                            <MaterialUiLink
                                href="#"
                                onClick={async () => {
                                    await copyShareLink();
                                }}
                            >
                                <LinkIcon />
                            </MaterialUiLink>
                        </AlignRight>
                    </ShareLink>

                    <SubHeadingWrapper>
                        <h1>Inventory</h1>
                    </SubHeadingWrapper>

                    {/* only appear for logged in user, no one else */}
                    <ButtonWrapper>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                redirectToAddGamePage();
                            }}
                        >
                            Add Game
                        </Button>
                    </ButtonWrapper>
                    {isLoading ? (
                        <p style={{ margin: '30px 0' }}>loading...</p>
                    ) : (
                        <>
                            {games.length === 0 && <p style={{ margin: '30px 0' }}>List is empty.</p>}
                            {gamesPlaying.length ? (
                                <GameTable title="Playing" games={gamesPlaying} userId={user_id} />
                            ) : (
                                ''
                            )}
                            {gamesWishlist.length ? (
                                <GameTable title="Wishlist" games={gamesWishlist} userId={user_id} />
                            ) : (
                                ''
                            )}
                            {gamesOnHold.length ? (
                                <GameTable title="On Hold" games={gamesOnHold} userId={user_id} />
                            ) : (
                                ''
                            )}
                            {gamesFinished.length ? (
                                <GameTable title="Finished" games={gamesFinished} userId={user_id} />
                            ) : (
                                ''
                            )}
                        </>
                    )}
                </ContainerInner>
            </Container>
        </>
    );
};

const mapStateToProps = (state: AppState) => ({
    userGames: state.userGames
});

const mapDispatchToProps = {
    callFetchGamesApi,
    callDeleteGameApi,
    executeClearSearchedGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);
