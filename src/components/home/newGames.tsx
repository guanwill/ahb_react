import React, { useEffect, useState } from 'react';
import api, { IApi } from '../../api';
import { Container, Grid, Link, makeStyles, Button } from '@material-ui/core';
import moment from 'moment';
import { NewGamesContainer, SubHeadingWrapper2, AddGameButtonWrapper } from '../../styles/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSearchedGame } from '../../actions/game/gameActions';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import getAuthenticatedUser from '../../helpers/getAuthenticatedUser';
import isTokenExpired from '../../helpers/isTokenExpired';

const NewGames: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [newGames, setNewGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLatestGamesOnLoad(api);
    }, []);

    const getLatestGamesOnLoad = async api => {
        await getLatestGames(api);
    };

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1
        }
    }));
    const classes = useStyles({});

    const userId = getAuthenticatedUser();
    const isUserTokenExpired = isTokenExpired();

    const onError = e => {
        e.target.src = 'https://i.postimg.cc/28ngFvKc/defaultfailedphoto.jpg';
    };

    const addGame = game => {
        const gameToAdd = {
            title: game.name,
            release_date: moment(game.original_release_date).format('YYYY-MM-DD')
        };

        dispatch(addSearchedGame(gameToAdd));
        history.push(`/user/${userId}/games/add`);
    };

    const getLatestGames = async (api: IApi) => {
        const response = await api.giantBombApi.fetchLatestGamesV2();
        setNewGames(response.data.latestGames);
        setLoading(false);
    };

    return (
        <Container>
            <div className={classes.root}>
                <SubHeadingWrapper2>
                    <h1>Latest Games</h1>
                </SubHeadingWrapper2>
                <NewGamesContainer>
                    {loading ? (
                        <p>loading...</p>
                    ) : (
                        newGames.map(game => (
                            <div className="upcomingGameContainer" key={game.id}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={1}>
                                        <img alt="" src={game.image.icon_url} onError={onError} />
                                    </Grid>
                                    <Grid className="upcomingGameName" item xs={12} sm={12} md={3}>
                                        <b>
                                            <Link href={game.site_detail_url}>{game.name}</Link>
                                        </b>
                                        {userId && !isUserTokenExpired && (
                                            <AddGameButtonWrapper>
                                                <Button
                                                    className="addGameButton"
                                                    type="submit"
                                                    onClick={() => {
                                                        addGame(game);
                                                    }}
                                                >
                                                    <AddCircleOutlineIcon />
                                                </Button>
                                            </AddGameButtonWrapper>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2}>
                                        {game.original_release_date
                                            ? moment(game.original_release_date).format('DD/MM/YYYY')
                                            : 'N/A'}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2}>
                                        {game.platforms && game.platforms.map(platform => platform.name).join(', ')}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        {game.deck ? game.deck : ''}
                                    </Grid>
                                </Grid>
                            </div>
                        ))
                    )}
                </NewGamesContainer>
            </div>
        </Container>
    );
};

export default NewGames;
